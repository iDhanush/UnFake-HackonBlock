import base64
import hashlib
import random
import string

image_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
video_extensions = ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'm4v']


def invoke_uid(length=10, alphanumeric=True):
    char_pool = string.ascii_lowercase + string.ascii_uppercase if alphanumeric else string.digits
    uid = "".join(random.choices(char_pool, k=length))
    return uid


def get_file(file_path):
    with open(file_path, "rb") as file:
        file = file.read()
        return file


def file_to_base64(file_path):
    file_content = get_file(file_path)
    base64_encoded = base64.b64encode(file_content)
    base64_string = base64_encoded.decode('utf-8')
    return base64_string


def sha256(string):
    return hashlib.sha256(string.encode()).hexdigest()


def file_to_sha256(fid):
    return sha256(file_to_base64(fid))


def get_four_screenshots(video_path):
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_indices = [math.floor(i * total_frames / 9) for i in range(1, 9)]
    screenshots = []
    for idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if ret:
            screenshots.append(frame)
    cap.release()
    return screenshots
