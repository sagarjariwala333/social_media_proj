import React from 'react';
import { RecordViewWrapper } from './Style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';

const SiteMatrix = () => {
  return (
    <RecordViewWrapper>
      <PageHeader title="Site Matrix" />
      
        <Main>
        <Cards headless>
          <div className="matrixtable">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="wd150">title</th>
                  <th className="wd45">
                    <div className="titlebox">
                      Florida bmnbmbmn<span>US, North America</span>
                    </div>
                  </th>
                  <th className="wd45">
                    <div className="titlebox">
                      Florida <span>US, North America</span>
                    </div>
                  </th>
                  <th className="wd45">
                    <div className="titlebox">
                      Florida <span>US, North America</span>
                    </div>
                  </th>
                  <th className="wd45">
                    <div className="titlebox">
                      Florida <span>US, North America</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="wd150">
                    Pavan Maruti<span>pavanmaruti27@gmail.com</span>
                  </td>
                  <td className="wd45">
                    <input type="checkbox" />
                  </td>
                  <td className="wd45">
                    <input type="checkbox" />
                  </td>
                  <td className="wd45">
                    <input type="checkbox" />
                  </td>
                  <td className="wd45">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr>
                  <td className="wd150">
                    Sujan Valand <span>sujanvaland@gmail.com</span>
                  </td>
                  <td className="wd45">
                    <input type="checkbox" />
                  </td>
                  <td className="wd45">
                    <input type="checkbox" />
                  </td>
                  <td className="wd45">
                    <input type="checkbox" />
                  </td>
                  <td className="wd45">
                    <input type="checkbox" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </Cards>
        </Main>
      
    </RecordViewWrapper>
  );
};

export default SiteMatrix;
