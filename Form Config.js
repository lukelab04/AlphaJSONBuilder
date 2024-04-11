(() => {
    let singleInput = Input.singleInput;
    let singleValue = Input.singleValue;

    let configObj = new Input({
        values: singleValue(new Value('object', {
            staticKeys: {
                input: singleInput('object', 'Data Input Options', {
                    staticKeys: {
                        group: singleInput('object', 'Data Grouping (optional)', {
                            default: undefined,
                            staticKeys: {
                                by: singleInput('string', 'Group By')
                            }
                        }),
                        map: singleInput('object', 'Data Mapping', {
                            staticKeys: {
                                dimensions: singleInput('array', 'Data Dimensions', {
                                    arrayInput: new Input({
                                        values: [
                                            {
                                                value: new Value('string'),
                                                dropdownLabel: 'Enter Dimension'
                                            },
                                            {
                                                value: new Value('object', {
                                                    staticKeys: {
                                                        src: singleInput('string', 'Data Source'),
                                                        as: singleInput('string', 'Type of data'),
                                                        values: singleInput('array', 'Possible values (optional)', {
                                                            default: undefined,
                                                            arrayInput: singleInput('string', 'Enter input as string')
                                                        })
                                                    }
                                                }),
                                                dropdownLabel: 'Enter Dimension Data Information'
                                            }
                                        ],
                                        label: 'Enter Dimensions',
                                        comments: '',
                                        validate: () => true,
                                    })
                                })
                            }
                        })
                    }
                }),
                output: singleInput('object', 'Output Settings', {
                    staticKeys: {
                        render: singleInput('object', 'Render Settings', {
                            staticKeys: {
                                type: singleInput('string', 'Type'),
                                stretch: singleInput('string', 'Stretch'),
                                offset: singleInput('object', 'Offset Settings', {
                                    staticKeys: {
                                        left: singleInput('number', 'Left Offset'),
                                        bottom: singleInput('number', 'Bottom Offset')
                                    }
                                }),
                                layer: singleInput('object', 'Layer Settings', {
                                    staticKeys: {
                                        point: singleInput('object', 'Point Settings', {
                                            staticKeys: {
                                                type: singleInput('string', 'Point Type'),
                                                margin: singleInput('object', 'Margin Settings', {
                                                    staticKeys: {
                                                        major: singleInput('number', 'Major Offset size')
                                                    }
                                                })
                                            }
                                        })
                                    },
                                    dynamicKeys: singleInput('object', 'Layer x Settings', {
                                        staticKeys: {
                                            interval: singleInput('object', 'Interval Settings (optional)', {
                                                default: undefined,
                                                staticKeys: {
                                                    size: singleInput('number', 'Size')
                                                }
                                            }),
                                            marks: singleInput('object', 'Marks Settings', {
                                                staticKeys: {
                                                    lines: singleInput('object', 'Lines Settings', {
                                                        staticKeys: {
                                                            show: singleInput('boolean', 'Show grid lines'),
                                                            bracket: singleInput('boolean', 'Bracket', { default: undefined }, (inputObj) => {
                                                                let selected = inputObj.parent.selected();
                                                                if (selected) {
                                                                    return selected.key('show').serialize();
                                                                }
                                                                return false;
                                                            })
                                                        }
                                                    }),
                                                    labels: singleInput('object', 'Label Settings', {
                                                        staticKeys: {
                                                            align: singleInput('string', 'Alignment'),
                                                            rotate: singleInput('number', 'Rotation'),
                                                            style: singleInput('string', 'CSS Styling')
                                                        }
                                                    })
                                                }
                                            }),
                                            title: singleInput('object', 'Title Settings (optional)', {
                                                default: undefined,
                                                staticKeys: {
                                                    location: singleInput('string', 'Title Location'),
                                                    html: singleInput('string', 'Title HTML'),
                                                    offset: singleInput('object', 'Offset Settings', {
                                                        staticKeys: {
                                                            major: singleInput('number', 'Major Offset')
                                                        }
                                                    }),
                                                    align: singleInput('string', 'Align')
                                                }
                                            }),
                                            reverse: singleInput('boolean', 'Reverse (optional)', {default: undefined}),
                                        }
                                    })
                                })
                            }
                        })
                    }
                }),
            }
        })),
        label: "Configure Input and Output",
        comments: "",
        validate: () => true,
    });

    return configObj;
})()