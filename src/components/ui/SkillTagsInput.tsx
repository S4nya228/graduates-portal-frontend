import React, { useState, KeyboardEvent } from 'react'

interface Skill {
	name: string
	description?: string
}

interface SkillTagsInputProps {
	skills: Skill[]
	onChange: (skills: Skill[]) => void
}

const SkillTagsInput: React.FC<SkillTagsInputProps> = ({
	skills,
	onChange,
}) => {
	const [inputValue, setInputValue] = useState('')

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault()
			const newSkillName = inputValue.trim()
			if (
				newSkillName &&
				!skills.some((skill) => skill.name === newSkillName)
			) {
				onChange([...skills, { name: newSkillName }])
			}
			setInputValue('')
		}
	}

	const removeSkill = (index: number) => {
		const newSkills = skills.filter((_, i) => i !== index)
		onChange(newSkills)
	}

	return (
		<div className="border rounded-md p-2 flex flex-wrap gap-2 bg-gray-50">
			{skills.map((skill, index) => (
				<div
					key={index}
					className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
				>
					{skill.name}
					<button
						type="button"
						onClick={() => removeSkill(index)}
						className="ml-2 text-blue-600 hover:text-blue-900"
					>
						&times;
					</button>
				</div>
			))}
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Додати навичку"
				className="flex-grow outline-none bg-transparent text-sm"
			/>
		</div>
	)
}

export default SkillTagsInput
