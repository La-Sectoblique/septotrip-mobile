import { LatLng, Polyline } from 'react-native-maps'

// interface ListeRoutesProps {
//     routes: Route[], 
//     handlePressEvent: (arg0: Route) => void,
// }

// export const ListRoutes = (props: ListeRoutesProps) => {

//     return (
//         <>
//             {
//             props.routes.length == 0? <></> :
//               props.routes.map((route: Route,i: number) => {
//                 return <Polyline
//                   key={i}
//                   coordinates={[
//                     {longitude: route.localisation.coordinates[0], latitude: route.localisation.coordinates[1]} as LatLng,
//                     route.coordinateEnd
//                   ]}
//                   strokeColor= {i%2 ? "red": "blue"}
//                   strokeWidth={6}
//                   tappable={true}
//                   onPress={(e) => {props.handlePressEvent(route)}}
//               />
//               })

//             }
//         </>
//     )
// }