import { NextRequest, NextResponse } from 'next/server';

// Simple email validation
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Mock function - replace with actual service integration
async function subscribeToNewsletter(email: string, source: string) {
  // Example integrations:
  
  // Mailchimp integration
  // const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email_address: email,
  //     status: 'subscribed',
  //     tags: [source],
  //   }),
  // });

  // ConvertKit integration
  // const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     api_key: CONVERTKIT_API_KEY,
  //     email: email,
  //     tags: [source],
  //   }),
  // });

  // For demo purposes, simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate occasional failures for testing
  if (Math.random() < 0.1) {
    throw new Error('Service temporarily unavailable');
  }

  return { success: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'unknown' } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check for existing subscription (mock check)
    // In real implementation, check your database or service
    
    // Subscribe to newsletter service
    await subscribeToNewsletter(email, source);

    // Log subscription (in production, save to database)
    console.log(`Newsletter subscription: ${email} from ${source} at ${new Date().toISOString()}`);

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        email: email 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);

    // Handle specific errors
    if (error.message?.includes('already subscribed')) {
      return NextResponse.json(
        { message: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    if (error.message?.includes('invalid email')) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsubscribe requests
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { message: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Unsubscribe logic here
    // await unsubscribeFromNewsletter(email);

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { message: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}