import './index.css'

const TableMenuList = props => {
  const {tableList, tableMenu, selectTableMenu} = props
  return (
    <ul className="table-menu-list">
      {tableList &&
        tableList.map(item => (
          <li key={item.tableMenu} data-testid={`menu-category-${tableMenu}`}>
            <button
              type="button"
              className={
                tableMenu === item.menuCategory
                  ? 'table-menu table-menu-active'
                  : 'table-menu'
              }
              onClick={() => selectTableMenu(item.menuCategory)}
            >
              {item.menuCategory}
            </button>
          </li>
        ))}
    </ul>
  )
}

export default TableMenuList
