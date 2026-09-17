# Electro - Features & Technical Specs

Google Stitch سے برآمد شدہ مکمل UI/UX پروجیکٹ، جو کہ لوکل فولڈر میں کامیابی کے ساتھ محفوظ کیا گیا ہے۔

## 📂 ڈائریکٹری کا ڈھانچہ (Directory Structure)

```
shopify/
├── index.html                                        # ماسٹر ڈیش بورڈ / لائیو پریویور
├── project_metadata.json                             # گوگل اسٹچ میٹا ڈیٹا اور کنفیگریشن
├── README.md                                         # یہ دستاویزی فائل
│
├── screens/                                          # مکمل HTML5 + Tailwind CSS اسکرینز
│   ├── 01_hero_and_navigation.html                   # ہیرو اور نیویگیشن بار
│   ├── 02_features_and_technical_specs.html          # "Own the Night" فیچرز و اسپیکس
│   ├── 03_shop_and_comparison_table.html             # شاپ اور ماڈل موازنہ ٹیبل
│   ├── 04_product_page_nighteye_led.html             # نائٹ آئی ایل ای ڈی پروڈکٹ پیج
│   ├── 05_product_page_with_compatibility_search.html # کار/بائیک مطابقت تلاش سلیکٹر
│   ├── 06_premium_automotive_led_lighting.html       # فل برانڈ لینڈنگ پیج (43KB)
│   └── 07_testimonials_and_footer.html               # ریویوز، ٹرسٹ بیجز اور فوٹر
│
└── screenshots/                                      # ہائی ریزولوشن لائیو اسکرین شاٹس
    ├── 01_hero_and_navigation.jpg
    ├── 02_features_and_technical_specs.jpg
    ├── 03_shop_and_comparison_table.jpg
    ├── 04_product_page_nighteye_led.jpg
    ├── 05_product_page_with_compatibility_search.jpg
    └── 07_testimonials_and_footer.jpg
```

---

## 🎨 ڈیزائن تھیم و گائیڈ لائنز (Design Tokens)

* **تھیم:** Dark Mode (`#12110c` بیک گراؤنڈ، `#1a1912` کارڈز)
* **پرائمری کلر:** Neon Yellow (`#ffd900`)
* **ٹائپوگرافی:** `Inter` (Google Fonts)
* **آئیکنز:** Google Material Symbols Outlined
* **بارڈر اسٹائل:** Rounded Full اور گول کونے (`rounded-full`, `rounded-2xl`)

---

## 🚀 اس پروجیکٹ کو کیسے کھولیں؟ (How to View)

1. اپنے فائنڈر (Finder) یا فائل مینیجر میں جائیں:
   ```
   /Users/kmall.pk/Downloads/shopify
   ```
2. **`index.html`** پر ڈبل کلک کریں تاکہ آپ کے براؤزر (Chrome/Safari) میں تمام اسکرینز کا خوبصورت ڈیش بورڈ کھل جائے۔
3. آپ کسی بھی اسکرین کو الگ سے `screens/` فولڈر میں جا کر براہِ راست بھی کھول سکتے ہیں۔
