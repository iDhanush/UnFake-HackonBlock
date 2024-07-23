import base64
import hashlib
import math
import random
import re
import string

import cv2
from pytube import YouTube
from pytube.innertube import _default_clients

_default_clients["ANDROID"]["context"]["client"]["clientVersion"] = "19.08.35"
_default_clients["IOS"]["context"]["client"]["clientVersion"] = "19.08.35"
_default_clients["ANDROID_EMBED"]["context"]["client"]["clientVersion"] = "19.08.35"
_default_clients["IOS_EMBED"]["context"]["client"]["clientVersion"] = "19.08.35"
_default_clients["IOS_MUSIC"]["context"]["client"]["clientVersion"] = "6.41"
_default_clients["ANDROID_MUSIC"] = _default_clients["ANDROID_CREATOR"]
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


def is_youtube_url(url):
    regex = r"you|yt"
    return re.search(regex, url)


def is_twitter_url(url):
    return "twitter.com" in url or "x.com" in url


def is_instagram_url(url):
    base_urls = ["https://www.instagram.com", "http://www.instagram.com", "https://instagram.com"]
    return any(url.startswith(base) for base in base_urls)


def yt_downloader(url, fid):
    yt = YouTube(url)
    stream = yt.streams.get_by_resolution('360p')
    print(stream)
    stream.download(output_path=f'assets', filename=f'{fid}.mp4')
