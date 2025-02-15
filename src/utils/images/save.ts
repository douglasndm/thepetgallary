import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from 'react-native-flash-message';

import { requestSavePermission } from '@utils/permissions/check';

async function saveImageOnGallery(path: string): Promise<void> {
	const extension = path.split('.').pop();

	const hasPermission = await requestSavePermission();

	if (!hasPermission) {
		showMessage({
			message:
				'O aplicativo não tem permissão para salvar arquivos no seu telefone',
			type: 'danger',
		});
		return;
	}

	const config = RNFetchBlob.config({
		fileCache: true,
		appendExt: extension, // Extensão do arquivo
	});

	const result = await config.fetch('GET', path);

	await CameraRoll.saveAsset(result.path(), {
		type: 'photo',
		album: 'The Pet Gallery',
	});

	showMessage({
		message: 'Imagem salva com sucesso!',
		type: 'success',
	});
}

export { saveImageOnGallery };
