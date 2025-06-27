import s from './Search.module.scss'

export const Search = ({
  onChange,
  search,
}: SearchProps) => {
  return (
    <div className={s.search}>
      <input
        type={'text'}
        value={search}
        onChange={e => onChange(e.target.value)}
        className={s.searchInput}
        size={25}
        placeholder={'Введите данные пользователя'}
      />
    </div>
  )
}

interface SearchProps {
  search: string
  onChange: (value: string) => void
}
