export const InputTypes = {
    TEXT: 'text',
    DATE_RANGE: 'date-range'
}

export const MediaTypes = {
    VIDEO: 'video',
    AUDIO: 'audio',
    IMAGE: 'image',
    ALBUM: 'album',
}

export const MetricTypes = {
    COUNT: { title: 'Astroids Count', id: 'Count' },
    AVG_SPEED: { title: 'Average Speed', id: 'AvgSpeed' },
    HAZARDOUS: { title: '% Hazardous', id: '%Hazardous' },
    MAX_DIAMETER: { title: 'Max Diameter', id: 'maxDiameter' }
}

export const ChartTypes = {
    BAR: 'Bar',
    PIE: 'Pie',
    LINE: 'Line'
}

export const AlertType = {
    SUCCESS: 'success',
    ERROR: 'error'
}