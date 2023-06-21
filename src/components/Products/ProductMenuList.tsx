interface ProductMenuList {
    title: string;
    menu: {
        key: string;
        value: number;
    }[];
}

const ProductMenuList: React.FC<ProductMenuList> = ({ title, menu }) => {
    return (
        <div>
            <h4>{title}</h4>
            <ul>
                {menu.length
                    ? menu.map((item, index) => {
                          return (
                              <li
                                  className='tw-flex tw-items-center tw-justify-between tw-w-full'
                                  key={`${title}-${index}`}
                              >
                                  {item.key}
                              </li>
                          );
                      })
                    : null}
            </ul>
        </div>
    );
};

export default ProductMenuList;
