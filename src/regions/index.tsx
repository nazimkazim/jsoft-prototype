import React, { useState } from 'react'
import { Typography, TextField, Box, Button } from "@material-ui/core"
import AddRegion from './Add'
import UpdateRegion from './Update'
import RemoveRegion from './Remove'
import useAxios, { configure, loadCache, serializeCache } from 'axios-hooks'
import { SERVER_URL, TOKEN } from "../utils";
//import { sections } from './data'


const Regions = () => {
	const [{ data, loading, error }, refetch] = useAxios({
		url: SERVER_URL + '/api/v1/location',
		method: "GET",
		headers: { "Authorization": TOKEN, }
	})

	if (loading) {
		return <p>loading...</p>
	}
	if (error) {
		return <p>Error, maybe not authorized</p>
	}
	const regions = data.results
	const handleAdd = (region: { id: string, name: string }, type: string = 'parent') => {
		const regionsArr = [...regions]

		regionsArr.push(region)
		// setRegions(regionsArr)
	}

	const handleUpdate = (value: string, type: string = 'parent') => {
		const regionsArr = [...regions]

		// regionsArr.forEach(region => {})
		// setRegions(regionsArr)
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
			<AddRegion handleSubmit={handleAdd} />
			<br />
			{data.results.map((region: any, index: any) => {
				return (
					<Box key={index} style={{ borderBottom: "2px solid black" }}>
						<Box display={"flex"} alignItems={"center"}>
							<Typography>
								{index + 1} - {region.area_name}
							</Typography>
							<AddRegion level={1} parentId={region.id} handleSubmit={() => console.log("Done")} />
							<UpdateRegion handleSubmit={handleAdd} region={region} />
							<RemoveRegion regionId={region.id} handleDelete={() => handleDelete('area1', region.id)} />

						</Box>
						{region.area1.map((district, index: any) => {
							return (
								<Box key={index} style={{ paddingLeft: 40 }}>
									<Box display={"flex"} alignItems={"center"}>
										<Typography>{district.area1_name}</Typography>
										<AddRegion level={2} parentId={district.id} handleSubmit={() => console.log("Done")} />
										<UpdateRegion handleSubmit={handleAdd} region={region} />
										<RemoveRegion regionId={region.id} />
									</Box>
									{district.area2.map((village: any, index: any) => (
										<Box key={index} style={{ paddingLeft: 40 }}>
											<Box display={"flex"} alignItems={"center"}>
												<Typography>{village.area2_name}</Typography>
											</Box>
										</Box>
									))}
								</Box>
							)
						})}
					</Box>
				)
			})}
		</Box>
	)
}

export default Regions
