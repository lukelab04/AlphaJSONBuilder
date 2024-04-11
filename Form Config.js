(() => {
    let singleInput = Input.singleInput;
    let singleValue = Input.singleValue;

    let configObj = new Input({
        values: singleValue(new Value('object', {
            staticKeys: {
                input: singleInput('object', 'Data Input Options', {
                    staticKeys: {
                        group: singleInput('object', 'Data Grouping (optional)', {
                            inline: true,
                            default: undefined,
                            staticKeys: {
                                by: singleInput('string', 'Group By', {}, {
                                    comments: 'Specify a categorical here. For example, if each data instance has a variable "Country", specify "Country" below.'
                                })
                            }
                        }),
                        map: singleInput('object', 'Data Mapping', {
                            inline: true,
                            staticKeys: {
                                dimensions: singleInput('array', 'Data Dimensions', {
                                    inline: true,
                                    arrayInput: singleInput('array', 'Dimension for a variable', {
                                        arrayInput: new Input({
                                            values: [
                                                {
                                                    value: new Value('string'),
                                                    dropdownLabel: 'Enter Dimension'
                                                },
                                                {
                                                    value: new Value('object', {
                                                        inline: true,
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
                                    }, {
                                        comments: 'The first item of this array should be "Enter Dimension", which is "x" or "y". The next entry should be "Enter Dimension Data Information".'
                                    })
                                }, {comments: 'Create a new array entry for each dimension.'})
                            }
                        })
                    }
                }),
                output: singleInput('object', 'Output Settings', {
                    staticKeys: {
                        render: singleInput('object', 'Render Settings', {
                            inline: true,
                            staticKeys: {
                                type: singleInput('string', 'Type'),
                                stretch: singleInput('string', 'Stretch'),
                                offset: singleInput('object', 'Offset Settings', {
                                    inline: true,
                                    staticKeys: {
                                        left: singleInput('number', 'Left Offset'),
                                        bottom: singleInput('number', 'Bottom Offset')
                                    }
                                }),
                                layer: singleInput('object', 'Layer Settings', {
                                    inline: true,
                                    staticKeys: {
                                        point: singleInput('object', 'Point Settings', {
                                            inline: true,
                                            staticKeys: {
                                                type: singleInput('string', 'Point Type'),
                                                margin: singleInput('object', 'Margin Settings', {
                                                    inline: true,
                                                    staticKeys: {
                                                        major: singleInput('number', 'Major Offset size')
                                                    }
                                                })
                                            }
                                        })
                                    },
                                    dynamicKeys: singleInput('object', 'Layer Settings', {
                                        staticKeys: {
                                            interval: singleInput('object', 'Interval Settings (optional)', {
                                                default: undefined,
                                                inline: true,
                                                staticKeys: {
                                                    size: singleInput('number', 'Size')
                                                }
                                            }),
                                            marks: singleInput('object', 'Marks Settings', {
                                                inline: true,
                                                staticKeys: {
                                                    lines: singleInput('object', 'Lines Settings', {
                                                        inline: true,
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
                                                        inline: true,
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
                                                inline: true,
                                                staticKeys: {
                                                    location: singleInput('string', 'Title Location'),
                                                    html: singleInput('string', 'Title HTML'),
                                                    offset: singleInput('object', 'Offset Settings', {
                                                        inline: true,
                                                        staticKeys: {
                                                            major: singleInput('number', 'Major Offset')
                                                        }
                                                    }),
                                                    align: singleInput('string', 'Align')
                                                }
                                            }),
                                            reverse: singleInput('boolean', 'Reverse (optional)', { default: undefined }),
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