import shutil

from utils import invoke_uid
from html2image import Html2Image


def html_parser(real_percentage, fake_percentage, file_hash, issued_for, collection_id, date):
    return f"""
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
      :root {{
        --primary: #7879F1;
        --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }}

      body {{
        font-family: "Poppins", sans-serif;
        padding: 0;
        margin: 0;
      }}

      .certi-wrapper {{
        width: 100%;
        height: 100vh;
        padding: 20px;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
      }}
      .certificate {{
        width: 100%;
        min-height: 100vh;
        background-color: #000;
        box-shadow: var(--shadow);
        display: flex;
      }}

      .left-bar {{
        min-width: 120px;
        min-height: 100%;
        background: var(--primary);
      }}

      .right-side {{
        width: 100%;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }}

      .certi-head {{
        font-size: 28px;
        font-weight: 600;
        color: var(--primary);
      }}

      .certi-head span {{
        color: #fff;
      }}

      .divider {{
        width: 100%;
        height: 2px;
        background-color: #ccd9fb91;
      }}

      .certi-flex {{
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 20px;
        align-items: center;
      }}

      .certi-flex-left {{
        margin-top: -60px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        color: #fff;
        width: 100%;
      }}

      .certi-grp {{
        display: flex;
        flex-direction: column;
        gap: 5px;
      }}

      .grp-title {{
        font-weight: 300;
        font-size: 14px;
      }}

      .grp-name {{
        font-weight: 500;
        font-size: 20px;
      }}

      .certi-id {{
        font-size: 16px;
      }}

      .certi-flex-right {{
        display: flex;
        color: #fff;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
        font-weight: 600;
      }}

      .certi-flex-right img {{
        margin-right: -25px;
      }}

      .qr-sec {{
        display: flex;
        color: #fff;
        font-size: 14px;
        align-items: flex-end;
        gap: 10px;
        margin-top: 20px;
      }}
      .cert-img {{
        padding-block: 40px;
      }}
      .img-container {{
        width: 100%;
        display: flex;
        align-items: center;
      }}
      .prediction {{
        color: #007bff;
        display: flex;
        align-items: center;
        gap: 40px;
      }}
      .content {{
        display: flex;
        align-items: center;
        gap: 40px;
        font-size: 30px;
      }}
      .fake {{
        color: #fd3992;
      }}
    </style>
  </head>
  <body>
    <div class="certificate">
      <div class="left-bar"></div>
      <div class="right-side">
        <h1 class="certi-head">Un<span>Mask</span></h1>
        <div class="divider"></div>
        <div class="img-container">
          <img
            src="https://i.ibb.co/MCn5NHL/head.png"
            width="900px"
            alt="img"
            class="cert-img"
          />
          <div class="prediction">
            <div class="content">
              <div class="real">Real : {real_percentage}%</div>
            </div>
            <div class="content">
              <div class="fake">Fake : {fake_percentage}%</div>
            </div>
          </div>
        </div>

        <div class="certi-flex">
          <div class="certi-flex-left">
            <div class="certi-grp">
              <div class="grp-title">Issued for</div>
              <div class="grp-name">{issued_for}</div>
              <div class="divider"></div>
            </div>
            <div class="certi-grp">
              <div class="grp-title">File Hash</div>
              <div class="grp-name certi-id">#{file_hash}</div>
              <div class="divider"></div>
            </div>
            <div class="certi-grp">
              <div class="grp-title">collection id & Token id</div>
              <div class="grp-name certi-id">{collection_id}</div>
              <div class="divider"></div>
            </div>
          </div>
          <div class="certi-flex-right">
            <div class="certi-date">{date}</div>
            <img
              src="https://i.ibb.co/47CcZvw/Medallionss.png"
              width="200"
              alt=""
            />
          </div>
        </div>
        <div class="qr-sec">
          <img
            src="https://i.ibb.co/7jQhnvM/qr-code-xxl.png"
            width="80"
            alt=""
          />
          <div class="verify">Verified by unmask.com</div>
        </div>
      </div>
    </div>
  </body>
</html>
"""


def html_to_image(html_string, output_file):
    hti = Html2Image()
    hti.screenshot(html_str=html_string, save_as=output_file, size=(1500, 830))


def create_certificate(real_percentage, fake_percentage, file_hash, issued_for, collection_id, date):
    certificate_uid = f"{invoke_uid()}.png"
    certificate_html = html_parser(real_percentage, fake_percentage, file_hash, issued_for, collection_id, date)
    print(certificate_html)
    html_to_image(certificate_html, certificate_uid)
    shutil.move(certificate_uid, 'certificates/' + certificate_uid)
    return certificate_uid
