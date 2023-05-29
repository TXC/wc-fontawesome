
export default function prefix (type, sharp) {
    let prefix
    switch (type) {
        case 'regular':
            prefix = sharp ? 'fasr' : 'far'
            break;
        case 'light':
            prefix = sharp ? 'fasl' : 'fal'
            break;
        case 'thin':
            prefix = 'fat'
            break;
        case 'duotone':
            prefix = 'fad'
            break;
        case 'brands':
            prefix = 'fab'
            break;
        case 'kit':
            prefix = 'fak'
            break;
        default:
            prefix = sharp ? 'fass' : 'fas'
    }
    return prefix
}
