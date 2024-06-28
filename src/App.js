import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from './components/Header'; // Import the Header component
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
const fonts = [
  { label: 'Sans Serif', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
  { label: 'Monospace', value: 'monospace' },
];

const fontFamilies = fonts.map(font => font.value);

const modules = {
  toolbar: [
    [{ 'font': fontFamilies }, { 'size': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean'],
   
  ]
};

const formats = [
  'font', 'size', 'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'script', 'header', 'blockquote', 'code-block',
  'list', 'bullet', 'indent', 'direction', 'align', 'link', 'image',

];

function App() {
  const [text, setText] = useState('');
  const [words, setWords] = useState(0);
  const [letters, setLetters] = useState(0);

  useEffect(() => {
    const Font = ReactQuill.Quill.import('formats/font');
    Font.whitelist = fontFamilies;
    ReactQuill.Quill.register(Font, true);
  }, []);

  const handleChange = (value) => {
    setText(value);
    updateCounts(value);
  };

  const clearText = () => {
    setText('');
    setWords(0);
    setLetters(0);
  };

  const updateCounts = (value) => {
    const words = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    const letters = value.replace(/\s/g, '').length;
    setWords(words);
    setLetters(letters);
  };

  return (
    <div className="App">
      <Header /> {/* Include the Header component */}
      <div className="editor-container">
        <ReactQuill
          value={text}
          onChange={handleChange}
          placeholder="Start typing..."
          modules={modules}
          formats={formats}
        />
        <button onClick={clearText}>Clear Page</button>
        <div>
          <p>Total words: {words}</p>
          <p>Total letters: {letters}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
