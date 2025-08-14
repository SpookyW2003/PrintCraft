import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import { Type, Trash2, ShoppingCart, ChevronsUp, ChevronUp, ChevronDown, ChevronsDown, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';

// Ensure this path is correct for your project structure
import { CartContext } from '../context/CartContext.jsx';

// Sample products to design on
const products = [
  { id: 'prod_tshirt', name: 'T-Shirt', imageUrl: 'https://media.istockphoto.com/id/1008254458/vector/mens-white-t-shirt.jpg?s=612x612&w=0&k=20&c=_ErH20ZWGd8TGUbw_h9-1YoZ8aiwIfZp2gtzS2wMoD0=', price: 20 },
  { id: 'prod_hoodie', name: 'Hoodie', imageUrl: 'https://i.ibb.co/d2D1kS4/hoodie-mockup.png', price: 45 },
];

const fontFamilies = [
  'Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New', 'Impact', 'Comic Sans MS'
];

// --- Reusable Properties Panel Component ---
const PropertiesPanel = ({ selectedElement, updateElement, deleteElement, changeLayer, elements }) => {
    const [localText, setLocalText] = useState('');

    useEffect(() => {
        if (selectedElement && selectedElement.type === 'text') {
            setLocalText(selectedElement.content);
        }
    }, [selectedElement]);

    if (!selectedElement) {
        return (
            <div className="p-4 text-center text-gray-500 h-full flex flex-col justify-center">
                <Type size={48} className="mx-auto text-gray-300" />
                <p className="mt-2">Select a text element on the canvas to see its properties.</p>
            </div>
        );
    }

    const applyTextChange = () => {
        if (selectedElement) {
            updateElement(selectedElement.id, { content: localText });
        }
    };

    const handleTextKeyDown = (e) => {
        if (e.key === 'Enter') {
            applyTextChange();
            e.target.blur();
        }
    };

    const currentIndex = elements.findIndex(el => el.id === selectedElement.id);

    return (
      <div className="p-1 space-y-4">
        <h3 className="font-bold text-lg capitalize text-gray-800">Text Properties</h3>
        
        <div>
            <label className="text-sm font-medium text-gray-600">Text</label>
            <input type="text" value={localText} onChange={(e) => setLocalText(e.target.value)} onBlur={applyTextChange} onKeyDown={handleTextKeyDown} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
            <label className="text-sm font-medium text-gray-600">Font Size</label>
            <input type="range" min="12" max="100" value={selectedElement.fontSize} onChange={e => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })} className="w-full" />
        </div>
        <div>
            <label className="text-sm font-medium text-gray-600">Font Family</label>
            <select value={selectedElement.fontFamily} onChange={e => updateElement(selectedElement.id, { fontFamily: e.target.value })} className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-indigo-500">
                {fontFamilies.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
        </div>
        <div>
            <label className="text-sm font-medium text-gray-600">Color</label>
            <input type="color" value={selectedElement.color} onChange={e => updateElement(selectedElement.id, { color: e.target.value })} className="w-full h-10 p-1 border rounded-md" />
        </div>
        <div>
            <label className="text-sm font-medium text-gray-600">Style</label>
            <div className="flex space-x-2 mt-1">
                <button onClick={() => updateElement(selectedElement.id, { fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' })} className={`p-2 border rounded-md flex-grow ${selectedElement.fontWeight === 'bold' ? 'bg-indigo-500 text-white' : 'bg-white'}`}>Bold</button>
                <button onClick={() => updateElement(selectedElement.id, { fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic' })} className={`p-2 border rounded-md flex-grow ${selectedElement.fontStyle === 'italic' ? 'bg-indigo-500 text-white' : 'bg-white'}`}>Italic</button>
            </div>
        </div>
        <div>
            <label className="text-sm font-medium text-gray-600">Layer</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
                <button onClick={() => changeLayer('forward')} disabled={currentIndex === elements.length - 1} className="p-2 flex items-center justify-center border rounded-md bg-white disabled:opacity-50"><ChevronUp size={16} className="mr-1" /> Forward</button>
                <button onClick={() => changeLayer('front')} disabled={currentIndex === elements.length - 1} className="p-2 flex items-center justify-center border rounded-md bg-white disabled:opacity-50"><ChevronsUp size={16} className="mr-1" /> To Front</button>
                <button onClick={() => changeLayer('backward')} disabled={currentIndex === 0} className="p-2 flex items-center justify-center border rounded-md bg-white disabled:opacity-50"><ChevronDown size={16} className="mr-1" /> Backward</button>
                <button onClick={() => changeLayer('back')} disabled={currentIndex === 0} className="p-2 flex items-center justify-center border rounded-md bg-white disabled:opacity-50"><ChevronsDown size={16} className="mr-1" /> To Back</button>
            </div>
        </div>
        <button onClick={deleteElement} className="w-full mt-6 flex items-center justify-center p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"><Trash2 size={16} className="mr-2" /> Delete Element</button>
      </div>
    );
};

// --- Main Text Editor Component ---
const TextEditor = () => {
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const nextId = useRef(1);
  
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-4">
            <AlertTriangle size={48} className="mb-4" />
            <h1 className="text-xl font-bold">Context Error</h1>
            <p>TextEditor component must be wrapped within a CartContext.Provider.</p>
        </div>
    );
  }
  const { addToCart } = cartContext;

  const selectedElement = elements.find(el => el.id === selectedElementId);

  const addElement = () => {
    const newElement = {
      id: nextId.current++,
      type: 'text',
      x: 150, y: 150,
      content: 'New Text',
      fontSize: 40,
      color: '#333333',
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontStyle: 'normal'
    };
    setElements([...elements, newElement]);
    setSelectedElementId(newElement.id);
  };
  
  const updateElement = (id, newProps) => setElements(prev => prev.map(el => (el.id === id ? { ...el, ...newProps } : el)));
  
  const deleteElement = () => {
    if (selectedElementId) {
      setElements(elements.filter(el => el.id !== selectedElementId));
      setSelectedElementId(null);
    }
  };

  const changeLayer = (direction) => {
    const currentIndex = elements.findIndex(el => el.id === selectedElementId);
    if (currentIndex === -1) return;

    const newElements = [...elements];
    const element = newElements.splice(currentIndex, 1)[0];

    let newIndex = currentIndex;
    if (direction === 'front') newIndex = newElements.length;
    else if (direction === 'back') newIndex = 0;
    else if (direction === 'forward') newIndex = Math.min(elements.length -1, currentIndex + 1);
    else if (direction === 'backward') newIndex = Math.max(0, currentIndex - 1);
    
    newElements.splice(newIndex, 0, element);
    setElements(newElements);
  };

  const handleAddToCart = async () => {
    if (!canvasRef.current) return;
    const originalSelectedId = selectedElementId;
    setSelectedElementId(null);
    await new Promise(resolve => setTimeout(resolve, 50));

    const canvas = await html2canvas(canvasRef.current, { backgroundColor: null });
    const previewImage = canvas.toDataURL('image/png');
    setSelectedElementId(originalSelectedId);

    addToCart({
      cartItemId: `${activeProduct.id}-${Date.now()}`, 
      productId: activeProduct.id,
      name: `Custom Text ${activeProduct.name}`,
      price: activeProduct.price,
      quantity: 1,
      customization: { preview: previewImage, elements: elements }
    });
    navigate('/cart');
  };

  const renderElementOnCanvas = (el, index) => {
    const isSelected = el.id === selectedElementId;
    const style = { 
        position: 'absolute', 
        border: isSelected ? '2px dashed #4f46e5' : '2px solid transparent', 
        cursor: 'grab', 
        userSelect: 'none',
        padding: '2px',
        zIndex: index
    };
    return (
        <Draggable 
            key={el.id} 
            bounds="parent" 
            position={{ x: el.x, y: el.y }} 
            onStart={() => setSelectedElementId(el.id)} 
            onStop={(e, data) => updateElement(el.id, { x: data.x, y: data.y })}
        >
            <div style={style}>
                <p style={{ 
                    fontSize: `${el.fontSize}px`, 
                    color: el.color, 
                    padding: '5px', 
                    whiteSpace: 'nowrap', 
                    fontFamily: el.fontFamily, 
                    fontWeight: el.fontWeight, 
                    fontStyle: el.fontStyle 
                }}>
                    {el.content}
                </p>
            </div>
        </Draggable>
    );
  };

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl p-4 lg:p-6">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Text Editor</h1>
                <p className="text-gray-500 mt-1">Create your unique text designs with our easy-to-use design tools.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <aside className="lg:col-span-3 bg-gray-50 rounded-lg p-4 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">1. Select Product</h2>
                        <select value={activeProduct.name} onChange={(e) => setActiveProduct(products.find(p => p.name === e.target.value))} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500">
                            {products.map(p => <option key={p.name}>{p.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">2. Add Text</h2>
                        <button onClick={addElement} className="w-full flex items-center justify-center p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                            <Type size={20} className="mr-3" /> Add New Text
                        </button>
                    </div>
                </aside>

                <main className="lg:col-span-6 flex items-center justify-center bg-gray-200 rounded-lg p-2">
                    <div ref={canvasRef} onClick={(e) => { if (e.target === e.currentTarget) setSelectedElementId(null) }} className="relative w-[500px] h-[600px] bg-white shadow-lg overflow-hidden bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${activeProduct.imageUrl})` }}>
                        {elements.map((el, index) => renderElementOnCanvas(el, index))}
                    </div>
                </main>

                <aside className="lg:col-span-3 bg-gray-50 rounded-lg p-4 flex flex-col">
                     <h2 className="text-lg font-semibold mb-2 text-gray-700">3. Customize Text</h2>
                     <div className="flex-grow overflow-y-auto">
                        <PropertiesPanel 
                            selectedElement={selectedElement}
                            updateElement={updateElement}
                            deleteElement={deleteElement}
                            changeLayer={changeLayer}
                            elements={elements}
                        />
                     </div>
                     <div className="mt-auto pt-4">
                        <button onClick={handleAddToCart} disabled={elements.length === 0} className="w-full flex items-center justify-center p-4 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                            <ShoppingCart size={22} className="mr-3" /> Add to Cart
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </div>
  );
};

export default TextEditor;
