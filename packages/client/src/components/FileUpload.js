import React, { Fragment, useState } from 'react';
import DisplayFont from './DisplayFont';
import axios from 'axios';
import logo from '../img/logo.svg';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploaded, setUploaded] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setFileChosen(true);
  };

  const alert2 = (e) => {
    const modal = document.getElementById('theModal');
    const span = document.getElementById('close');

    modal.style.display = 'block';

    span.onclick = function () {
      modal.style.display = 'none';
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    if (file.name === undefined) {
      alert2();
    } else {
      const extensionList = ['ttf', 'otf', 'woff', 'woff2'];
      const extension = file.name.split('.').pop();
      if (extensionList.includes(extension) === false) {
        alert2();
      } else {
        try {
          const res = await axios.post('/uploads', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {},
          });

          const { fileName, filePath } = res.data;

          setUploadedFile({ fileName, filePath });
          setUploaded(true);

          const hide = (e) => {
            document.getElementById('main').style.display = 'none';
          };

          hide();
        } catch (err) {
          if (err.response.status === 500) {
          } else {
          }
        }
      }
    }
  };

  //Drag and Drop Functionality
  const handleDragEnter = (e) => {
    document.getElementById('test').style.borderColor = '#ff4cb4';
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    document.getElementById('test').style.borderColor = '#00f534';
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    document.getElementById('test').style.borderColor = '#ff4cb4';
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    document.getElementById('test').style.borderColor = '#00f534';
    e.preventDefault();
    e.stopPropagation();

    let file = e.dataTransfer.files;
    file = file[0];
    const formData = new FormData();
    formData.append('file', file);
    const extensionList = ['ttf', 'otf', 'woff', 'woff2'];
    const extension = file.name.split('.').pop();
    if (extensionList.includes(extension) === false) {
      alert2();
    } else {
      const res = await axios.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setUploaded(true);

      const hide = (e) => {
        document.getElementById('main').style.display = 'none';
      };

      hide();
    }
  };

  return (
    <Fragment>
      <div className='drop-container' id='main'>
        <form
          onSubmit={onSubmit}
          id='test'
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e)}
        >
          <h1>Drag & drop your font file here!</h1>
          <div>
            <input type='file' id='customFile' onChange={onChange} />
            <label htmlFor='customFile'>Or upload your font manually</label>
            {fileChosen && <h3 className='text-center'>{filename}</h3>}
          </div>

          <hr />
          <input type='submit' value='Upload' />
        </form>
      </div>

      <div className='modal' id='theModal'>
        <div className='modal-content'>
          <span className='close' id='close'>
            &times;
          </span>
          <img src={logo} alt='Font Frog Logo' />
          <p>
            Font Frog only accepts .ttf, .otf, & .woff files. Please upload a compatible file
          </p>
        </div>
      </div>
      {uploadedFile ? (
        <div className='info'>
          <div>
            <h1 className='text-center'>{uploadedFile.fileName}</h1>
          </div>
        </div>
      ) : null}
      {uploaded && (
        <Fragment>
          <DisplayFont file={uploadedFile.filePath} /> <p>{}</p>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FileUpload;
