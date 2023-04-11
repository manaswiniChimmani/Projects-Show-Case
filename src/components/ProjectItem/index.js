import './index.css'

const ProjectItem = props => {
  const {data} = props
  const {id, imageUrl, name} = data
  return (
    <li className="card">
      <img src={imageUrl} alt={name} />
      <p className="name">{name}</p>
    </li>
  )
}
export default ProjectItem
