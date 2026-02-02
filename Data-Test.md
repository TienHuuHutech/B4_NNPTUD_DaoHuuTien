# DATA MẪU TEST API PRODUCTS

Dùng để test:

* GET theo **slug** (equal)
* Validate **POST**: bắt buộc trường, `price` là số, slug chuẩn hóa từ title
* Validate **query**: `page`, `limit` là số nguyên dương, `maxPrice >= minPrice`

---

## I. POST /products — HỢP LỆ (PASS)

### Case 1

```json
{
  "title": "Áo Khoác Nam 2026 !!!",
  "price": 120,
  "description": "Áo khoác chống nước",
  "category": "jacket",
  "images": ["https://example.com/jacket.png"]
}
```

**Slug kỳ vọng:** `ao-khoac-nam-2026`

### Case 2

```json
{
  "title": "Classic Heather Gray Hoodie",
  "price": 69,
  "description": "Gray hoodie",
  "category": "hoodie"
}
```

**Slug kỳ vọng:** `classic-heather-gray-hoodie`

---

## II. POST — THIẾU TRƯỜNG (FAIL)

### Thiếu `title`

```json
{
  "price": 120,
  "description": "Test",
  "category": "jacket"
}
```

### Thiếu `price`

```json
{
  "title": "Áo Khoác",
  "description": "Test",
  "category": "jacket"
}
```

### Thiếu `description`

```json
{
  "title": "Áo Khoác",
  "price": 120,
  "category": "jacket"
}
```

### Thiếu `category`

```json
{
  "title": "Áo Khoác",
  "price": 120,
  "description": "Test"
}
```

---

## III. POST — `price` KHÔNG PHẢI SỐ (FAIL)

```json
{
  "title": "Áo Khoác",
  "price": "abc",
  "description": "Test",
  "category": "jacket"
}
```

---

## IV. POST — TITLE NHIỀU KÝ TỰ ĐẶC BIỆT (PASS — test slug)

```json
{
  "title": "Áo!!! ### Khoác *** Nam   2026",
  "price": 150,
  "description": "Slug test",
  "category": "jacket"
}
```

**Slug kỳ vọng:** `ao-khoac-nam-2026`

---

## V. GET THEO SLUG (PASS)

```
/products/slug/ao-khoac-nam-2026
/products/slug/classic-heather-gray-hoodie
```

---

## VI. GET /products — QUERY HỢP LỆ (PASS)

```
/products?page=1&limit=5
/products?title=ao&minPrice=10&maxPrice=200&page=1&limit=10
/products?title=hoodie&page=2&limit=3
```

---

## VII. GET — SAI `page` (FAIL)

```
/products?page=abc&limit=5
/products?page=-1&limit=5
/products?page=1.5&limit=5
```

---

## VIII. GET — SAI `limit` (FAIL)

```
/products?page=1&limit=abc
/products?page=1&limit=-10
/products?page=1&limit=2.5
```

---

## IX. GET — SAI LOGIC GIÁ (FAIL)

```
/products?minPrice=200&maxPrice=100
```

---

## X. GET — SAI KIỂU GIÁ (FAIL)

```
/products?minPrice=abc&maxPrice=200
/products?minPrice=10&maxPrice=xyz
```
