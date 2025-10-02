import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export async function exportJSONandShare(filename: string, data: unknown) {
  const file = new File(Paths.cache, filename);
  const stream = file.writableStream();
  const encoder = new TextEncoder();
  const writer = stream.getWriter();
  await writer.write(encoder.encode(JSON.stringify(data, null, 2)));
  await writer.close();
  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(file.uri, { mimeType: 'application/json' });
  }
  return file.uri;
}
