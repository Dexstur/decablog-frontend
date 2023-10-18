import {
  Wrapper,
  Top,
  CategoriesWrap,
  CategoryHead,
  Category,
  Toggler,
  ToggleText,
  IconWrap,
} from '../dashboard/SpaceSide.style'
import { HiOutlineUsers } from 'react-icons/hi'
import { LuMousePointer2 } from 'react-icons/lu'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useState } from 'react'

interface CategoryList {
  category: string[]
  active?: string
  create?: () => void
  dark?: boolean
}

function CategorySide({
  category = [],
  active = 'none',
  create = () => null,
  dark = false,
}: CategoryList) {
  const [max, setMax] = useState(6)

  function toggleMax() {
    if (max == 6) {
      setMax(category.length)
    } else {
      setMax(6)
    }
  }
  return (
    <Wrapper>
      <Top to="#" onClick={create} className={dark ? 'dark-card' : ''}>
        <HiOutlineUsers size="24px" color="#34a952" />
        <span style={{ color: '#34a952' }}>Create Space +</span>
      </Top>
      <CategoriesWrap className={dark ? 'dark-card' : ''}>
        <CategoryHead>CATEGORIES</CategoryHead>
        {category.length === 0 && <p>No spaces</p>}
        {category.length > 0 &&
          category.map((item, index) => (
            <Category
              to={`/category/space/${item}`}
              key={index}
              show={index < max}
              highlight={active == item}
              dark={dark}
            >
              {item}
            </Category>
          ))}
        <Toggler onClick={toggleMax}>
          <ToggleText>
            <IconWrap>
              <LuMousePointer2 size={10} color="#34a952" />
            </IconWrap>
            <p>{max == 6 ? 'Discover more' : 'Show Less'}</p>
          </ToggleText>
          <RiArrowDropDownLine size={18} />
        </Toggler>
      </CategoriesWrap>
    </Wrapper>
  )
}

export default CategorySide
