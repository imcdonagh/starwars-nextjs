import Person from "@/types/Person";
import { getInitials, stringToHslColor } from "@/utils/utils";
import { Avatar, Box, Card, CardContent, Chip, Divider, Icon, LinearProgress, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import RocketOutlinedIcon from '@mui/icons-material/RocketOutlined';
import GetPersonDetailsResponse from "@/types/GetPersonDetailsResponse";

const Icons = {
  aboutme: PersonOutlineOutlinedIcon,
  films: MovieOutlinedIcon,
  starships: RocketOutlinedIcon
}

const Units = {
  height: 'in',
  weight: 'lb'
}

export interface PersonDetailsProps {
  person: Person
  details: GetPersonDetailsResponse | null
  loading: boolean
}

export default function PersonDetails(props: PersonDetailsProps) {
  const person = props.person
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <PersonHeading {...props}></PersonHeading>
          <SectionDivider />
          <SectionHeading title="About Me" icon="aboutme"></SectionHeading>
          <AboutMeContent {...props}></AboutMeContent>
          <SectionDivider />
          <SectionHeading title="Films" icon="films"></SectionHeading>
          <FilmsContent {...props}></FilmsContent>
          <SectionDivider />
          <SectionHeading title="Starships Flown" icon="starships"></SectionHeading>
          <StarshipsContent {...props}></StarshipsContent>
        </Stack>
      </CardContent>
    </Card>
  )

  function SectionDivider() {
    return <Divider sx={{marginBottom: '8px', marginTop: '8px'}}></Divider>
  }

  function PersonHeading(props: PersonDetailsProps) {
    return (
      <Box sx={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Avatar sx={{ bgcolor: stringToHslColor(person.name, 30, 80) }}>
          {getInitials(person.name)}
        </Avatar>
        <h2 style={{marginLeft: 16}}>{person.name}</h2>
      </Box>
    )  
  }

  interface SectionHeadingProps {
    title: string
    icon: string
  }

  function SectionHeading(props: SectionHeadingProps) {
    const MyIcon = Icons[props.icon as keyof typeof Icons]
    return (
      <h3 style={{marginBottom: '8px', display:'flex'}}>
        <span style={{marginRight: '8px'}}>
          <MyIcon />
        </span>
        {props.title}
      </h3>
    )
  }

  function AboutMeContent(props: PersonDetailsProps) {
    const person = props.person
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Height</TableCell>
            <TableCell>{person.height} {Units.height}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weight</TableCell>
            <TableCell>{person.mass} {Units.weight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hair Color</TableCell>
            <TableCell>{person.hair_color}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date of Birth</TableCell>
            <TableCell>{person.birth_year}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Species</TableCell>
            <TableCell>
              <SpeciesContent {...props}></SpeciesContent>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  function SpeciesContent(props: PersonDetailsProps) {
    if (props.loading) return <LinearProgress></LinearProgress>
    const details = props.details
    return (
      <div>
        {
          !details?.species?.length
          ? <div><em>Unknown</em></div>
          : details.species.map((species, index) => (
            <Chip 
              label={species.name} key={index} 
              sx={{marginRight: '8px', marginY: '8px'}}
            ></Chip>
          ))
        }
      </div>
    )
  }

  function FilmsContent(props: PersonDetailsProps) {
    if (props.loading) return <LinearProgress></LinearProgress>
    if (!props.person.films.length) return <div><em>None</em></div>
    if (!props.details?.films?.length) return <></>
    const content = props.details.films.map((film, index) => (
      <Chip key={index} label={film.title}
        sx={{marginRight: '8px', marginBottom: '8px'}}
      ></Chip>
      ))
    return <div>{content}</div>
  }

  function StarshipsContent(props: PersonDetailsProps) {
    if (props.loading) return <LinearProgress></LinearProgress>
    if (!props.person.starships.length) return <div><em>None</em></div>
    if (!props.details?.starships.length) return <></>
    const content = props.details.starships.map((starship, index) => (
      <Chip key={index} label={starship.name}
        sx={{marginRight:'8px', marginBottom: '8px'}}
      ></Chip>
    ))
    return <div>{content}</div>
  }
}