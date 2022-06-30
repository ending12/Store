import React, { useEffect, FC } from "react"
import { Typography, Checkbox as AntdCheckbox } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../../store/reducers/index"
import { CategoryState } from "../../store/reducers/category.reducer"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import { getCategory } from "../../store/actions/category.action"

const { Title } = Typography

interface Props {
  handleFilter: (arg: string[]) => void
}

const CheckBox: FC<Props> = ({ handleFilter}) => {
  const dispatch = useDispatch()

  const category = useSelector<AppState, CategoryState>(
    state => state.category
  )

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const onChange = (checkedValue: CheckboxValueType[]) => {
    handleFilter(checkedValue as string[])
  }
  return (
    <>
      <Title level={4}>按照分类筛选</Title>
      <AntdCheckbox.Group
        className="checkBoxFilter"
        options={category.category.result.map(item => ({
          label: item.name,
          value: item._id
        }))}
        onChange={onChange}
      />
    </>
  )
}
export default CheckBox;