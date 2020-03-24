import React, { Fragment, useState } from 'react';
import DisplayFont from './DisplayFont';
import axios from 'axios';
import logo from '../img/logo.svg';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({}); // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setFileChosen(true);
  };

  const alert2 = e => {
    const modal = document.getElementById('theModal');
    const span = document.getElementById('close');

    modal.style.display = 'block';

    span.onclick = function() {
      modal.style.display = 'none';
    };

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  };

  const onSubmit = async e => {
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
          const res = await axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
              // Clear percentage
            }
          });

          const { fileName, filePath } = res.data;

          setUploadedFile({ fileName, filePath });
          setUploaded(true);

          const hide = e => {
            document.getElementById('main').style.display = 'none';
          };

          hide();

          setMessage('File Uploaded');
        } catch (err) {
          if (err.response.status === 500) {
            setMessage('There was a problem with the server');
          } else {
            setMessage(err.response.data.msg);
          }
        }
      }
    }
  };

  return (
    <Fragment>
      <div className='drop-container' id='main'>
        <form onSubmit={onSubmit} id='test'>
          <h1>Drag & drop your font file here!</h1>
          <div className='custom-file mb-4'>
            <input type='file' className='custom-file-input' id='customFile' onChange={onChange} />
            <label className='custom-file-label' htmlFor='customFile'>
              Or upload your font manually
            </label>
            {fileChosen && <h3 className='text-center'>{filename}</h3>}
          </div>

          <hr />
          <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4' />
        </form>
      </div>

      <div className='modal' id='theModal'>
        <div className='modal-content'>
          <span className='close' id='close'>
            &times;
          </span>
          <img src={logo} alt='Font Frog Logo' />
          <p>Font Frog only accepts .ttf, .otf, .woff, & .woff2 files. Please upload a compatible file</p>
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
