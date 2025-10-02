import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export async function exportJSONandShare(filename: string, data: unknown) {
  const fileUri = FileSystem.cacheDirectory + filename;
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2));
  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(fileUri, { mimeType: 'application/json' });
  }
  return fileUri;
}
