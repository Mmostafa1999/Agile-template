import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from 'ai';

// Check if API key is provided
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

// Create a Gemini API client
const genAI = new GoogleGenerativeAI(apiKey || '');

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Ensure API key exists
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'Missing API key. Please set the GEMINI_API_KEY environment variable.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { messages } = await req.json();

    // Create a Gemini model instance
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-001',
    });

    // Convert messages from the Vercel AI SDK format to Gemini format
    const geminiMessages = messages.map((message: Message) => {
      // Ensure message content is a valid string
      const content = typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
      
      return {
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: content }],
      };
    });

    // Remove the first system message if present (Gemini doesn't support system messages)
    if (geminiMessages.length > 0 && geminiMessages[0].role === 'system') {
      geminiMessages.shift();
    }

    // Create a chat session
    const chat = model.startChat({
      history: geminiMessages.slice(0, -1), // Don't include the last message
    });

    // Generate a response stream
    const lastMessage = geminiMessages[geminiMessages.length - 1].parts[0].text;
    const response = await chat.sendMessageStream(lastMessage);

    const textEncoder = new TextEncoder();
    
    // Convert the response to the Vercel AI SDK format
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Process each part of the response
          for await (const chunk of response.stream) {
            if (chunk.text) {
              const text = chunk.text();
              if (text) {
                // Format as per Vercel AI SDK protocol (type 0 is text)
                // Ensure the text is valid JSON by properly encoding it
                controller.enqueue(textEncoder.encode(`0:${JSON.stringify(text)}\n`));
              }
            }
          }
          controller.close();
        } catch (error) {
          console.error('Error processing stream:', error);
          controller.error(error);
        }
      }
    });

    // Return a streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('API route error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 