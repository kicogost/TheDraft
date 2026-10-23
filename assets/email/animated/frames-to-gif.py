"""Assemble header frames into looping GIFs.

python3 assets/email/animated/frames-to-gif.py <frames-dir> <out-dir>
Frames are 1200x210; the GIF is written at 600 wide (the email column is
640), which keeps each file small enough for inboxes.
"""
import glob, os, sys
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for d in sorted(glob.glob(os.path.join(src, "*"))):
    frames = [Image.open(f).convert("RGB") for f in sorted(glob.glob(os.path.join(d, "*.png")))]
    w, h = frames[0].size
    small = [f.resize((w // 2, h // 2), Image.LANCZOS) for f in frames]
    pal = small[0].quantize(colors=48, method=Image.Quantize.MEDIANCUT)
    q = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in small]
    path = os.path.join(out, f"sec-{os.path.basename(d)}.gif")
    q[0].save(path, save_all=True, append_images=q[1:], duration=100, loop=0, optimize=True, disposal=1)
    print(path, os.path.getsize(path))
