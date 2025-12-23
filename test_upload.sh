# Create a dummy image
echo "fake image content" > test_image.png

# Upload it
curl -X POST http://localhost:5214/api/media/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test_image.png;type=image/png" \
  -F "userId=1"

# Check if it returns 200 and JSON
