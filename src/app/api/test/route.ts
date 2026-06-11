// make simpel route jsut return greadthign eessage make function then call and return the response a funcitonjsut return hello

import { NextRequest, NextResponse } from 'next/server';

function greetingFunction() {
  return 'Hello, world!';
}

export async function GET(request: NextRequest) {
  const res = greetingFunction();

  return NextResponse.json({ message: res });
}
