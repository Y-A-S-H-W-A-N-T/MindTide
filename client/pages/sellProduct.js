import React, { useState } from 'react';
import styles from '../styles/sell.module.css';
import { storage } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { useRouter } from 'next/router';

function SellProduct() {
  const [data, setData] = useState({
    name: '',
    description: '',
    thumbnail: '',
    price: '',
    review: '',
    stock: '',
    company: '',
    images: [],
  });

  const router = useRouter()

  const [loading,setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const Sell = async(e) => {
    e.preventDefault();
    setLoading(true)

    await axios.post('http://localhost:8000/product/add-product',data)
    .then((res)=>{
        if(res.status === 200)
        {
            setLoading(false)
            router.replace('/')
        }
    })
    .catch((err)=>{
        alert("Please Try Again")
    })
  };

  const uploadMultiplePhotos = (files) => {
  
    if (files.length === 0) alert("Upload product images")
    setLoading(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadPhotos(file).then((link)=>{
        setData((prev)=>(
            {
                ...prev,
                images: [...prev.images, link]
            }
        ))
      })
    }
    setLoading(false)
  };

  const uploadThumbnail = (image)=>{
    if (image===null) return alert("upload thumbnail image")
    setLoading(true)
    uploadPhotos(image).then((link)=>{
        setData((prev)=>(
            {
                ...prev,
                thumbnail: link
            }
        ))
    })
    setLoading(false)
  }
  
  const uploadPhotos = (image) => {
    return new Promise((resolve, reject) => {
      const imgRef = ref(storage, `/MindTide/${Date.now()}`);
      uploadBytes(imgRef, image)
        .then((res) => {
          getDownloadURL(res.ref)
            .then((link) => {
              resolve(link);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sell Your Product</h1>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Product Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Enter product name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
            className={styles.textarea}
            placeholder="Enter product description"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>thumbnail</label>
          <input
            type="file"
            name="images"
            onChange={(e)=>uploadThumbnail(e.target.files[0])}
            className={styles.input}
            accept="image/*"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Price</label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Enter price"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Review</label>
          <input
            type="number"
            name="review"
            value={data.review}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Enter product review"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Available Pieces</label>
          <input
            type="number"
            name="stock"
            value={data.stock}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Enter available pieces"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Company</label>
          <input
            type="text"
            name="company"
            value={data.company}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Enter company name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Product Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e)=>uploadMultiplePhotos(e.target.files)}
            className={styles.input}
            accept="image/*"
          />
        </div>

        <button type="submit" className={styles.submitButton} onClick={Sell} disabled={loading}>{loading?'Loading...':'SELL'}</button>
      </div>
    </div>
  );
}

export default SellProduct;