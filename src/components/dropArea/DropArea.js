import React, { Component } from 'react';
import './index.css';
import * as opentype from 'opentype.js';
import './index.js';

class DropArea extends Component{
    state = {
        dragging: false
    }
    dropRef = React.createRef();

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if(e.dataTransfer.items && e.dataTransfer.items.length > 0){
            this.setState({dragging: true});
        }
        var border = document.getElementById('drop');
        border.style.borderColor = '#ff4cb4';
    }
    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if(this.dragCounter > 0) return;
        this.setState({dragging: false});
        var border = document.getElementById('drop');
        border.style.borderColor = '#00f534';
    }
    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false});
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
            const files = e.dataTransfer.files[0];
            const extensionList = ['ttf', 'otf', 'woff', 'woff2'];
            const extension = files.name.split('.').pop();
            if(extensionList.includes(extension) === false){
                console.log('wrong');
            } else{
                console.log('yay!');
                
                //file upload
                
            }
            this.dragCounter = 0;
        }
    }

    componentDidMount(){
        this.dragCounter = 0;
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount(){
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
    }

    render(){
        return(
            <div className="drop" id="drop" ref={this.dropRef} >
                <h1>Drag & drop your font file here!</h1>
                <hr />
                <label for='upload'>Or upload your font manually</label>
                <input type='file' id='upload' name='upload' accept=".ttf, .otf, .woff, .woff2" onChange={this.fileHandler} method="post"/>
                {this.props.children}
            </div>
        );
    }
}

export default DropArea;