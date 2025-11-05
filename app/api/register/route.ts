import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone } = await request.json();

    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { message: 'Please provide all required fields: email, password, name, and phone' },
        { status: 400 }
      );
    }

    // Validate phone number format (basic validation for standard phone numbers)
    const phoneRegex = /^[0-9]{10,15}$/; // Allow 10-15 digits
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: 'Please provide a valid phone number (10-15 digits, numbers only)' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if email or phone already exists
    const existingUser = await db.collection('users').findOne({
      $or: [
        { email },
        { phone }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: 'This email is already registered' },
          { status: 400 }
        );
      }
      if (existingUser.phone === phone) {
        return NextResponse.json(
          { message: 'This phone number is already registered' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with phone number
    await db.collection('users').insertOne({
      email,
      name,
      phone,
      hashedPassword,
      emailVerified: new Date(),
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create a unique index on phone number if it doesn't exist
    try {
      await db.collection('users').createIndex({ phone: 1 }, { unique: true });
    } catch (indexError) {
      console.log('Index already exists or error creating index:', indexError);
    }

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
