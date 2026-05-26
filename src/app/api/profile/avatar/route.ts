import { connectDB } from '@/core/db/DbConnection';
import { User } from '@/models/User.model';
import { IsUserAuthenticate } from '@/utils/AuthRequest';
import { NextRequest, NextResponse } from 'next/server';
import { uploadAvatarToCloudinary } from '@/services/cloudinary/cloudinaryUpload';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const userId = await IsUserAuthenticate(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'Missing file' }, { status: 400 });
    }

    const result = await uploadAvatarToCloudinary({ file, userId });

    const updated = await User.findByIdAndUpdate(
      userId,
      { image: result.secure_url },
      { new: true }
    )
      .select('name email image createdAt profile')
      .lean();

    return NextResponse.json({
      message: 'Avatar updated',
      imageUrl: result.secure_url,
      user: updated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server Error';
    return NextResponse.json({ message }, { status: 500 });
  }
}

