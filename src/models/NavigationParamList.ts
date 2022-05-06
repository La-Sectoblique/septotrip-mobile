import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"

export type RootStackParamList= {
    Login: undefined,
    Register: undefined,
    Planification: { trip: TripOutput },
    TripList: undefined,
}


export type RootTabParamList= {
    Voyage: { trip: TripOutput },
    Day: { trip: TripOutput },
    Info: undefined,
}