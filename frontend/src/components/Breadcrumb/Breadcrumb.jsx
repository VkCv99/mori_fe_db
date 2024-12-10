import { Link } from 'react-router-dom';

const Breadcrumb = ({ pageName, ppt }) => {

  const downloadFile = (file) => {
     try {
      const link = document.createElement('a');
      link.href = file;
      link.download = 'presentation.pptx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }


  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-title-md2 mb-3 font-semibold text-primary">
          {pageName}
        </h2>
        <span onClick = {()=> downloadFile(ppt)} className='text-primary cursor-pointer'>Here's a reference guide to navigate this section.</span>
      </div>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              IAG /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
