from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output/pdf/elias-rescue-robot-catalog-zh-TW.pdf"
PUBLIC = ROOT / "public/downloads/elias-rescue-robot-catalog-zh-TW.pdf"
FONT = "/System/Library/Fonts/STHeiti Medium.ttc"
pdfmetrics.registerFont(TTFont("PingFang", FONT, subfontIndex=0))
W, H = A4

MODELS = [
    {
        "code": "ATLAS-RS01", "name": "災區搜尋型",
        "headline": "先進入瓦礫，讓救援團隊看清現場。",
        "copy": "協助搜尋、照明與救援物資搬運，現場任務由專業人員指揮。",
        "points": ["搜尋與環境照明", "影像與感測資訊回傳", "救援物資搬運", "遠端指揮與緊急停止"],
        "image": ROOT / "public/images/v2/robot-models/atlas-rs01.jpg", "accent": "#38D8C8"
    },
    {
        "code": "EMBER-RF02", "name": "消防滅火型",
        "headline": "面對高溫，先讓風險被看見。",
        "copy": "進入高溫區域執行滅火與降溫，支援消防人員掌握現場變化。",
        "points": ["高溫區域遠端進入", "滅火與局部降溫", "熱源與環境資訊回傳", "消防人員保留完整指揮權"],
        "image": ROOT / "public/images/v2/robot-models/ember-rf02.jpg", "accent": "#E3A536"
    },
    {
        "code": "TIDE-RW03", "name": "洪災水域救援型",
        "headline": "在洪水中，維持運送、救援與通訊。",
        "copy": "協助運送物資、提供漂浮救援與通訊支援，讓現場保持連結。",
        "points": ["救援物資運送", "漂浮救援支援", "現場通訊中繼", "由救援人員設定任務範圍"],
        "image": ROOT / "public/images/v2/robot-models/tide-rw03.jpg", "accent": "#7DAEFF"
    },
]

def draw_cover_image(c, path, x, y, width, height):
    with Image.open(path) as image:
        iw, ih = image.size
    scale = max(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    c.saveState()
    p = c.beginPath(); p.rect(x, y, width, height); c.clipPath(p, stroke=0, fill=0)
    c.drawImage(ImageReader(str(path)), x + (width - dw) / 2, y + (height - dh) / 2, dw, dh)
    c.restoreState()

def text(c, value, x, y, size, color="#F3F7F6", leading=None):
    c.setFont("PingFang", size); c.setFillColor(HexColor(color))
    obj = c.beginText(x, y); obj.setLeading(leading or size * 1.35)
    for line in value.split("\n"): obj.textLine(line)
    c.drawText(obj)

def footer(c, page):
    c.setStrokeColor(Color(1,1,1,.14)); c.line(38, 34, W-38, 34)
    text(c, "ELIAS NET  /  RESCUE ROBOTICS", 38, 18, 6.7, "#93A8A8")
    text(c, f"CONCEPT CATALOG  /  {page:02d}", W-150, 18, 6.7, "#93A8A8")

def build():
    OUT.parent.mkdir(parents=True, exist_ok=True); PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
    c.setTitle("Elias Rescue 救援機器人概念型錄")
    draw_cover_image(c, MODELS[0]["image"], 0, 0, W, H)
    c.setFillColor(Color(0.02,0.06,0.08,.58)); c.rect(0,0,W,H,stroke=0,fill=1)
    c.setFillColor(Color(0.02,0.06,0.08,.72)); c.rect(0,0,W,H*.48,stroke=0,fill=1)
    text(c, "ELIAS NET  /  2026", 42, H-56, 8, "#A9BCBC")
    text(c, "ELIAS RESCUE", 42, H*.39, 12, "#38D8C8")
    text(c, "人先決定方向，\n機器人先走進危險。", 42, H*.32, 29, "#F4F7F6", 38)
    text(c, "三種概念機型，支援搜尋、消防與洪災救援。", 42, H*.16, 10, "#C3D0CF")
    text(c, "概念型錄｜外觀、規格與能力將依研究調整", 42, 42, 7.5, "#93A8A8")
    c.showPage()

    for index, model in enumerate(MODELS, start=2):
        c.setFillColor(HexColor("#07151B")); c.rect(0,0,W,H,stroke=0,fill=1)
        draw_cover_image(c, model["image"], 0, H*.42, W, H*.58)
        c.setFillColor(Color(.02,.06,.08,.35)); c.rect(0,H*.42,W,H*.58,stroke=0,fill=1)
        c.setFillColor(HexColor(model["accent"])); c.rect(38,H*.39,84,3,stroke=0,fill=1)
        text(c, "RESCUE ROBOTICS  /  概念機型", 38, H*.355, 7.5, model["accent"])
        text(c, f"{model['code']}  {model['name']}", 38, H*.315, 17, "#F4F7F6")
        text(c, model["headline"], 38, H*.255, 20, "#F4F7F6")
        text(c, model["copy"], 38, H*.205, 9.5, "#B8C8C7")
        start_y = H*.145
        for i, point in enumerate(model["points"], start=1):
            x = 38 + ((i-1)%2)*260; y = start_y - ((i-1)//2)*34
            text(c, f"0{i}", x, y, 7.2, model["accent"])
            text(c, point, x+28, y, 8.6, "#E6EFED")
        footer(c, index)
        c.showPage()
    c.save()
    PUBLIC.write_bytes(OUT.read_bytes())
    print(OUT)
    print(PUBLIC)

if __name__ == "__main__": build()
