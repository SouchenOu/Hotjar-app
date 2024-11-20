import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState, React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TemplateGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All templates');
  const [templates, setTemplates] = useState([]);
  const [value, setValue] = useState('');
  const [filtredTemplate, setFiltredTemplate] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: siteId } = useParams();
  const navigate = useNavigate();

  const categories = [
    { name: 'All templates', count: 6, value: 'All templates' },
    { name: 'Most Popular', count: 3, value: 'Most Popular' },
    {
      name: 'Customer satisfaction & NPS',
      count: 2,
      value: 'Customer satisfaction & NPS',
    },
  ];

  const navigateToHome = () => {
    navigate('/');
  };

  const handleClick = (id) => {
    navigate(`/site/${siteId}/survey/create/template/${id}`);
  };

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/templates/getTemplates'
        );
        const result = response.data;
        setTemplates(result);
        setFiltredTemplate(result);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getTemplates();
  }, []);

  const searchTemplate = async (name) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/templates/searchTemplate',
        { name }
      );
      const result = response.data;
      if (result.length > 0) {
        setFiltredTemplate(result);
      } else {
        setFiltredTemplate(templates);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value) {
      searchTemplate(value);
    } else {
      setFiltredTemplate(templates);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const filterTemplates = (category) => {
    if (category === 'Most Popular') {
      setFiltredTemplate(templates.slice(0, 3));
    } else if (category === 'Customer satisfaction & NPS') {
      setFiltredTemplate(
        templates.filter((template) => template.name.includes('NPS'))
      );
    } else {
      setFiltredTemplate(templates);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterTemplates(category);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between fixed top-0 left-0 right-0 h-16 border-b border-gray-300 bg-white z-10 shadow-md">
        <div className="flex items-center gap-[10px] px-4 py-[11px] cursor-pointer">
          <FontAwesomeIcon
            icon={faXmark}
            className="text-[15px] text-red-500 cursor-pointer"
            onClick={navigateToHome}
          />
          <h1 className="text-[14px] text-gray-600 font-semibold">Templates</h1>
        </div>
        <img src="/avito-logo.png " alt="" className="w-[50px] h-[50px]" />
      </div>
      <div className="flex flex-col items-start justify-start px-[100px] py-[100px] gap-2">
        <h1 className="text-[20px] text-gray-800 font-bold">
          Template Gallery
        </h1>
        <p className="text-[14px] text-gray-500 px-[10px]">
          Explore our tried-and-tested templates, or create a survey from
          scratch.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 px-6 py-6">
        <div className="flex flex-col w-full md:w-1/4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.value)}
              className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-md ${selectedCategory === category.value ? 'bg-indigo-100' : 'hover:bg-indigo-100'}`}
            >
              <h1 className="text-[15px] text-gray-800 font-medium">
                {category.name}
              </h1>
              <h1 className="text-[12px] font-medium">{category.count}</h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full md:w-3/4 gap-6">
          <div className="relative w-full max-w-full">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200"
            />
            <input
              placeholder="Search a template"
              value={value}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md pl-12 pr-4 py-2 text-[16px] placeholder-gray-400 text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-6">
            {filtredTemplate.map((template) => (
              <div
                className="flex flex-col gap-4 border border-gray-300 rounded-md p-4  w-1/4 cursor-pointer hover:shadow-2xl"
                key={template._id}
                onClick={() => handleClick(template._id)}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-[400px] h-50 object-cover rounded-md"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-[15px] text-gray-800 font-semibold">
                    {template.name}
                  </h1>
                  <p className="text-[12px] text-gray-500">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
