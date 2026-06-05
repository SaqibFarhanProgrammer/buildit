import axios from 'axios';
import { NextRequest } from 'next/server';
import { languagesMap } from '../../../../../data';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code, language }: { code: string; language: string } = body;

  if (!code || !language) {
    return Response.json(
      {
        output: 'Code and language are required',
      },
      { status: 400 }
    );
  }

  const CodeLanguage = languagesMap[language.toString().toLowerCase()];

  if (!CodeLanguage) {
    return Response.json(
      {
        output: `Unsupported language: ${language}`,
      },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      'https://ce.judge0.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: code,
        language_id: CodeLanguage.judge0,
        stdin: '',
      }
    );

    const output =
      response.data.stdout ||
      response.data.stderr ||
      response.data.compile_output ||
      response.data.message ||
      'No output';

    return Response.json({
      output,
    });
  } catch (error) {
    console.error('RUN_ROUTE_ERROR:', error);
    return Response.json(
      {
        output: 'Execution error',
      },
      { status: 500 }
    );
  }
}
