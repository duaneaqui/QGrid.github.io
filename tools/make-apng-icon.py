"""Generate a sci-fi HUD APNG favicon for R/S QGrid Studio."""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

SIZE = 128
FRAMES = 24
DURATION_MS = 50  # ~20 fps, 1.2s loop
OUT = Path(__file__).resolve().parents[1] / "assets" / "qgrid-icon.png"


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def clamp(v: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, v))


def rgba(hex_color: str, alpha: float = 1.0) -> tuple[int, int, int, int]:
    hex_color = hex_color.lstrip("#")
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    return (r, g, b, int(255 * clamp(alpha)))


def draw_diamond(draw: ImageDraw.ImageDraw, cx: float, cy: float, half: float, fill, outline=None, width: int = 1):
    pts = [
        (cx, cy - half),
        (cx + half, cy),
        (cx, cy + half),
        (cx - half, cy),
    ]
    draw.polygon(pts, fill=fill, outline=outline)
    if outline and width > 1:
        draw.line(pts + [pts[0]], fill=outline, width=width)


def make_frame(index: int, total: int) -> Image.Image:
    t = index / total
    pulse = 0.5 + 0.5 * math.sin(t * math.pi * 2)
    spin = t * math.pi * 2

    # Layered canvas for glow compositing
    base = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    hud = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    draw = ImageDraw.Draw(hud)

    cx = cy = SIZE / 2

    # Soft outer bloom
    bloom_r = 54 + pulse * 4
    gdraw.ellipse(
        [cx - bloom_r, cy - bloom_r, cx + bloom_r, cy + bloom_r],
        fill=rgba("#62e9ff", 0.10 + pulse * 0.08),
    )

    # Orbital ring
    ring_r = 46
    draw.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        outline=rgba("#62e9ff", 0.35 + pulse * 0.25),
        width=2,
    )
    # Dashed tick marks around ring
    for i in range(12):
        ang = spin + i * (math.pi * 2 / 12)
        inner = ring_r - 5
        outer = ring_r + 1
        x1 = cx + math.cos(ang) * inner
        y1 = cy + math.sin(ang) * inner
        x2 = cx + math.cos(ang) * outer
        y2 = cy + math.sin(ang) * outer
        draw.line([(x1, y1), (x2, y2)], fill=rgba("#73ffd9", 0.45 if i % 3 else 0.85), width=2)

    # Scanning arc
    arc_span = 70
    arc_start = math.degrees(spin) - arc_span / 2
    bbox = [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r]
    draw.arc(bbox, start=arc_start, end=arc_start + arc_span, fill=rgba("#62e9ff", 0.95), width=3)

    # Core diamond plate
    half = 26 + pulse * 1.5
    draw_diamond(draw, cx, cy, half + 3, fill=rgba("#0a1b28", 0.95), outline=rgba("#e8fcff", 0.9), width=2)
    draw_diamond(draw, cx, cy, half, fill=None, outline=rgba("#62e9ff", 0.55 + pulse * 0.35), width=2)

    # Inner facet lines (rotated cross)
    inset = half * 0.42
    draw.line([(cx, cy - inset), (cx, cy + inset)], fill=rgba("#62e9ff", 0.35), width=1)
    draw.line([(cx - inset, cy), (cx + inset, cy)], fill=rgba("#62e9ff", 0.35), width=1)

    # Orbiting mote
    mote_ang = -spin * 1.35
    mx = cx + math.cos(mote_ang) * 46
    my = cy + math.sin(mote_ang) * 46
    gdraw.ellipse([mx - 6, my - 6, mx + 6, my + 6], fill=rgba("#62e9ff", 0.35))
    draw.ellipse([mx - 2.5, my - 2.5, mx + 2.5, my + 2.5], fill=rgba("#73ffd9", 1.0))

    # Second mote (amber, opposite)
    mote2 = mote_ang + math.pi
    mx2 = cx + math.cos(mote2) * 46
    my2 = cy + math.sin(mote2) * 46
    draw.ellipse([mx2 - 2, my2 - 2, mx2 + 2, my2 + 2], fill=rgba("#ffc857", 0.9))

    # Glyph: morph R <-> S via opacity crossfade
    # R on first half, S on second
    phase = (math.sin(t * math.pi * 2) + 1) / 2  # 0..1
    r_alpha = clamp(1 - abs(phase - 0.15) * 2.2)
    s_alpha = clamp(1 - abs(phase - 0.85) * 2.2)
    # Keep one glyph dominant
    if t < 0.5:
        glyph, g_alpha = "R", 0.75 + pulse * 0.25
    else:
        glyph, g_alpha = "S", 0.75 + pulse * 0.25

    # Draw letter as blocky HUD glyph using polygons for crisp small size
    glyph_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glyph_layer)
    # Prefer truetype if available; fallback to default
    try:
        from PIL import ImageFont

        font = ImageFont.truetype("arialbd.ttf", 42)
    except Exception:
        font = ImageFont.load_default()

    # Measure and center
    bbox = gd.textbbox((0, 0), glyph, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = cx - tw / 2 - bbox[0]
    ty = cy - th / 2 - bbox[1] - 1
    gd.text((tx, ty), glyph, font=font, fill=rgba("#f4fbff", g_alpha))

    # Accent underline pulse under glyph
    uw = 10 + pulse * 8
    draw.line([(cx - uw, cy + 18), (cx + uw, cy + 18)], fill=rgba("#62e9ff", 0.55 + pulse * 0.35), width=2)

    glow_blurred = glow.filter(ImageFilter.GaussianBlur(radius=6))
    out = Image.alpha_composite(base, glow_blurred)
    out = Image.alpha_composite(out, hud)
    out = Image.alpha_composite(out, glyph_layer)
    return out


def main() -> None:
    frames = [make_frame(i, FRAMES) for i in range(FRAMES)]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=DURATION_MS,
        loop=0,
        format="PNG",
        optimize=False,
    )
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes, {FRAMES} frames)")


if __name__ == "__main__":
    main()
