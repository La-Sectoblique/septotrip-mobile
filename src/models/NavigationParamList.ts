import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"

export type RootStackParamList= {
    Login: undefined,
    Register: undefined,
    Planification: { trip: TripOutput, isReadOnly: boolean },
    TripList: undefined,
}


export type RootTabParamList= {
    Voyage: { trip: TripOutput, pointToFocus?: PointOutput },
    Day: { trip: TripOutput },
    Info: { trip: TripOutput },
    Fichier: { trip: TripOutput}
}