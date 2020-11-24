import React, { useState, useEffect } from 'react'
import { Typography, TextField, Box, Button } from "@material-ui/core"
import AddSection from './Add'
import UpdateSection from './Update'
import RemoveRegion from './Remove'
import useAxios, { configure, loadCache, serializeCache } from 'axios-hooks'
import { SERVER_URL, TOKEN } from "../utils";
import { sections } from './data'


const Sections = () => {
	const [{ data, loading, error }, refetch] = useAxios({
		url: SERVER_URL + '/api/v1/location',
		method: "GET",
		headers: { "Authorization": TOKEN, }
	})

	const [_sections, setSections] = useState([])

	useEffect(() => {
		setSections(sections)
	}, [sections])

	if (loading) {
		return <p>loading...</p>
	}
	if (error) {
		return <p>Error, maybe not authorized</p>
	}

	console.log(_sections);

	const handleAdd = (section: { id: number, section_name: string, children: { id: number; section_name: string; }[]; }, type: string = 'parent') => {
		const sectionsArr = [..._sections]
		sectionsArr.push(section)
		setSections(sectionsArr)
	}

	const handleUpdate = (item, value, type) => {
		// check type of section
		if (type === 'parent') {
			let newSections = [..._sections].map((section) => {
				// check if section.id equals to item.id (selected item)
				if (section.id === item.id) {
					// modify propery of the selected item if true
					return Object.assign({}, item, { section_name: value });
				} else {
					return section
				}
			})
			setSections(newSections)
		}

		if (type === 'child') {
			let newSections = [..._sections]
			newSections.forEach((section) => {
				section.children.forEach((child) => {
					if (child.id === item.id) {
						child.section_name = value
					}
				})
			})
			setSections(newSections)
		}
	}

	const handleDelete = (type: string, id: string) => {
		if (type === 'area1') {
			data.results.map((obj) => {
				console.log(obj)
			})
		}
	}


	return (
		<Box>
			<AddSection handleSubmit={handleAdd} />
			<br />
			{_sections && _sections.map((section: any, index: any) => {
				return (
					<Box key={index} style={{ borderBottom: "2px solid black" }}>
						<Box display={"flex"} alignItems={"center"}>
							<Typography>
								{index + 1} - {section && section.section_name}
							</Typography>
							<AddSection level={1} parentId={section?.id} handleSubmit={() => console.log("Done")} />
							<UpdateSection handleUpdate={handleUpdate} section={section} type="parent" />
							<RemoveRegion regionId={section?.id} handleDelete={() => handleDelete('area1', section.id)} />
						</Box>
						{section?.children.map((child) => (
							<Box display={"flex"} alignItems={"center"} style={{ paddingLeft: 40 }}>
								<Typography>
									{child.section_name}
								</Typography>
								<UpdateSection handleUpdate={handleUpdate} section={child} type="child" />
								<RemoveRegion regionId={child.id} handleDelete={() => handleDelete('area1', child.id)} />
							</Box>
						))}
					</Box>
				)
			})}
		</Box>
	)
}

export default Sections