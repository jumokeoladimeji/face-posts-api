.post('/photos/upload', fileUpload.single('image'), (req, res, next) => {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
    
           streamifier.createReadStream(req.body.file.buffer).pipe(stream);
        });
    };
    
    async function upload(req) {
      let result = await streamUpload(req);
    }
    
    upload(req);
})