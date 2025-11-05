import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone, referral } = await request.json();

    // Input validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { message: 'Please provide all required fields: email, password, name, and phone' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: 'Please provide a valid phone number (10-15 digits, numbers only)' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    // Explicitly specify the database name to ensure consistency
    const db = client.db('shillmonger');

    // Check for existing user in a single query
    const existingUser = await db.collection('users').findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { phone: phone.trim() }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase().trim()) {
        return NextResponse.json(
          { message: 'This email is already registered' },
          { status: 400 }
        );
      }
      if (existingUser.phone === phone.trim()) {
        return NextResponse.json(
          { message: 'This phone number is already registered' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user document
    const userData: any = {
      email: email.toLowerCase().trim(),
      name: name.trim(),
      phone: phone.trim(),
      hashedPassword,
      emailVerified: new Date(),
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add referral if provided
    if (referral && typeof referral === 'string' && referral.trim() !== '') {
      userData.referral = referral.trim();
    }

    // Create user
    const result = await db.collection('users').insertOne(userData);

    // Create indexes if they don't exist
    try {
      await db.collection('users').createIndexes([
        { key: { email: 1 }, unique: true },
        { key: { phone: 1 }, unique: true }
      ]);
    } catch (indexError) {
      console.log('Indexes already exist or error creating indexes:', indexError);
    }

    if (!result.acknowledged) {
      throw new Error('Failed to create user');
    }

    return NextResponse.json(
      { message: 'User created successfully', userId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = error.keyPattern?.email ? 'email' : 'phone';
      return NextResponse.json(
        { message: `This ${field} is already registered` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: error.message || 'An error occurred during registration',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
