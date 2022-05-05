import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"

export type RootStackParamList= {
    Login: undefined,
    Register: undefined,
    Planification: { trip: TripOutput },
    TripList: undefined,
    Info: undefined
}