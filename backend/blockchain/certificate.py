from html2image import Html2Image

from utils import invoke_uid

html_certificate = """
<html>
<style>
body {
   font-family: Arial, sans-serif;
   margin: 0;
   padding: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   background: #000;
   color: #fff;
}
p {color:white;}
.container {
   width: 100%;
   max-width: 1200px;
   margin: 0 auto;
   padding: 20px;
}

.logo {
   font-size: 5em;
   text-align: center;
   color: #007BFF;
   border-bottom: 2px solid #007BFF;
   padding: 20px;
}

.certificate {
   font-size: 2em;
   text-align: center;
   color: #007BFF;
   border-bottom: 2px solid #007BFF;
   padding: 20px;
}

.certificate-item {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
}

.certificate-item-name {
   font-size: 1.5em;
   color: #fff;
}

.certificate-item-file {
   font-size: 1.5em;
   color: #fff;
}

.certificate-item-date {
   font-size: 1.5em;
   color: #fff;
}

.certificate-item-badge {
   font-size: 1.5em;
   color: #fff;
}

.certificate-item-badge-title {
   font-size: 1.5em;
   color: #007BFF;
}

.certificate-item-badge-progress {
   width: 100%;
   height: 20px;
   background: linear-gradient(to right, #007BFF, #fff);
   border-radius: 50%;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.certificate-item-badge-progress-fill {
   width: 0;
   height: 100%;
   background: #007BFF;
}
</style>
<body>
   <div class="container">
       <div class="logo">
           <h1>UnMask</h1>
       </div>
       <div class="certificate">
           <h2>Certificate Of Authenticity</h2>
       </div>
       <div class="certificate-item">
           <div class="certificate-item-name">
               <p>Issued for</p>
               <p>John Smith</p>
           </div>
           <div class="certificate-item-file">
               <p>File ID</p>
               <p>#2222223356</p>
           </div>
           <div class="certificate-item-date">
               <p>08.08.2023</p>
           </div>
           <div class="certificate-item-badge">
               <div class="certificate-item-badge-title">
                   <p>Badge Title</p>
               </div>
               <div class="certificate-item-badge-progress">
                   <div class="certificate-item-badge-progress-fill"></div>
               </div>
           </div>
       </div>
       <div class="certificate-item">
           <div class="certificate-item-name">
               <p>Verified by UnMask.com</p>
           </div>
       </div>
   </div>
</body>
</html>
"""


def html_to_image(html_string, output_file):
    hti = Html2Image()
    hti.screenshot(html_str=html_string, save_as=output_file, size=(800, 800))


def create_certificate(file_uid, file_hash, date, tx_id, polygon_url):
    certificate_uid = invoke_uid()
    html_to_image(html_certificate, f"certificates/{certificate_uid}.png")
