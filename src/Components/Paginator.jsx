import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Paginator = ({ url, page }) => {

    return (
        <>
            {page.totalPages === 0 ||
                <ul className='pagination'>
                    <li className={page.first ? "page-item disabled" : "page-item"}>
                        <Link className='page-link' to={`${url}/0?sizePage=${page.sizePage}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5" />
                        </svg></Link>
                    </li>

                    {page.number == 0 ||
                        <li className='page-item'>
                            <Link className='page-link' to={`${url}/${page.number - 1}?sizePage=${page.sizePage}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                            </svg></Link>
                        </li>
                    }

                    {page.number < page.totalPages - 1 &&
                        <li className='page-item'>
                            <Link className='page-link' to={`${url}/${page.number + 1}?sizePage=${page.sizePage}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                            </svg></Link>
                        </li>
                    }

                    <li className={page.last ? "page-item disabled" : "page-item"}>
                        <Link className='page-link' to={`${url}/${page.totalPages - 1}?sizePage=${page.sizePage}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0M11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5" />
                        </svg></Link>
                    </li>
                </ul>
            }

        </>
    );
}

export default Paginator;
