import {createTheme} from "@mui/material";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Ubuntu, sans-serif'
    }
  },
  components: {
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
        maxWidth: false
      },
      styleOverrides: {
        root: {
          margin: "0",
          width: "unset"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 'unset',
          padding: '10px 20px',
          boxShadow: 'none',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '20px',
          borderRadius: '8px',
          textTransform: 'unset',
          ':hover': {
            boxShadow: 'none'
          }
        },
      },
      variants: [
        {
          props: {color: 'primary', variant: 'contained'},
          style: {
            backgroundColor: '#6FB295',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#598E77',
              boxShadow: 'none'
            },
            '&:pressed': {
              backgroundColor: '#436B59'
            },
            ':active': {
              backgroundColor: '#6FB295'
            },
            ':disabled': {
              backgroundColor: '#A9D1BF'
            }
          }
        },
        {
          props: {color: 'primary', variant: 'outlined'},
          style: {
            backgroundColor: 'transparent',
            color: '#6FB295',
            borderColor: '#A9D1BF',
            '&:hover': {
              backgroundColor: '#F1F7F4'
            },
            '&:pressed': {
              backgroundColor: '#E2F0EA'
            },
            ':disabled': {
              color: '#A9D1BF',
              borderColor: '#A9D1BF'
            }
          }
        },
        {
          props: {color: 'primary', variant: 'text'},
          style: {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            color: '#6FB295',
            '&:hover': {
              borderColor: '#A9D1BF',
              backgroundColor: '#F1F7F4'
            },
            '&:pressed': {
              borderColor: '#A9D1BF',
              backgroundColor: '#E2F0EA'
            },
            ':disabled': {
              color: '#A9D1BF'
            }
          }
        },
        {
          props: {color: 'secondary', variant: 'contained'},
          style: {
            backgroundColor: '#F1F2F4',
            color: '#2B334A',
            '&:hover': {
              backgroundColor: '#E7E8EC'
            },
            '&:pressed': {
              backgroundColor: '#CBCEDA'
            },
            ':active': {
              backgroundColor: '#F1F2F4'
            },
            ':disabled': {
              backgroundColor: '#F1F2F4',
              color: '#B2B5C5'
            }
          }
        },
        {
          props: {color: 'secondary', variant: 'outlined'},
          style: {
            backgroundColor: 'transparent',
            color: '#2B334A',
            borderColor: '#CBCEDA',
            '&:hover': {
              backgroundColor: '#F1F2F4'
            },
            '&:pressed': {
              backgroundColor: '#E7E8EC'
            },
            ':disabled': {
              borderColor: '#CBCEDA',
              color: '#B2B5C5'
            }
          }
        },
        {
          props: {color: 'secondary', variant: 'text'},
          style: {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            color: '#2B334A',
            '&:hover': {
              borderColor: '#CBCEDA',
              backgroundColor: '#F1F2F4'
            },
            '&:pressed': {
              borderColor: '#CBCEDA',
              backgroundColor: '#E7E8EC'
            },
            ':disabled': {
              color: '#B2B5C5'
            }
          }
        },
        {
          props: {color: 'danger', variant: 'contained'},
          style: {
            backgroundColor: '#FEEFEF',
            color: '#DA1414',
            '&:hover': {
              backgroundColor: '#F8D0D0'
            },
            '&:pressed': {
              backgroundColor: '#F0A1A1'
            },
            ':active': {
              backgroundColor: '#FEEFEF'
            },
            ':disabled': {
              backgroundColor: '#FEEFEF',
              color: '#F0A1A1'
            }
          }
        },
        {
          props: {color: 'danger', variant: 'outlined'},
          style: {
            backgroundColor: 'transparent',
            color: '#DA1414',
            borderColor: '#F0A1A1',
            '&:hover': {
              backgroundColor: '#FEEFEF'
            },
            '&:pressed': {
              backgroundColor: '#F8D0D0'
            },
            ':disabled': {
              borderColor: '#F0A1A1',
              color: '#F0A1A1'
            }
          }
        },
        {
          props: {color: 'danger', variant: 'text'},
          style: {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            color: '#DA1414',
            '&:hover': {
              borderColor: '#F0A1A1',
              backgroundColor: '#FFF7F7'
            },
            '&:pressed': {
              borderColor: '#F0A1A1',
              backgroundColor: '#FEEFEF'
            },
            ':disabled': {
              color: '#F0A1A1'
            }
          }
        }
      ]
    },
    MuiInput: {
      styleOverrides: {
        // root: {
        //   width: '400px',
        //   height: 'unset',
        //   padding: '13px 10px',
        //   border: '1px solid #E7E8EC',
        //   borderRadius: '8px',
        //   fontSize: '14px',
        //   fontWeight: '400',
        //   lineHeight: '20px',
        //   color: '#171F33',
        //   letterSpacing: '0'
        // },
        // input: {
        //   height: 'unset',
        //   padding: '0',
        //   fontSize: '14px',
        //   fontWeight: '400',
        //   lineHeight: '20px',
        //   color: '#171F33'
        // }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: 400,
          padding: '0 0 0 10px',
        },
        input: {
          fontSize: 14,
          lineHeight: 20,
          color: '#171F33',
          height: 18,
          margin: '10px 10px 10px 8px',
          padding: 0,
        },
        notchedOutline: {
          borderRadius: 8,
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              boxShadow: '0px 0px 0px 2px #D4E5D8',
              borderColor: '#6FB295',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6FB295',
            },
            '&:disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E7E8EC',
              background: '#F8F9FA'
            },
          },
        },
        input: {
          // fontSize: 14,
          // lineHeight: 20,
          // color: '#171F33',
          // ':focus': {
          //   boxShadow: '0px 0px 0px 2px #D4E5D8'
          // }
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          margin: 0
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {}
      },
      variants: [
        {
          props: {role: 'columnheader'},
          style: {
            '&:hover': {
              cursor: 'pointer'
            }
          }
        },
        {
          props: {role: 'row'},
          style: {
            backgroundColor: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#F8F9FA',
              '& td': {
                backgroundColor: '#F8F9FA',
              }
            },
            ':active': {
              backgroundColor: '#EEF6F2',
              '& td': {
                backgroundColor: '#EEF6F2'
              }
            },
            '&:nth-of-type(even)': {
              backgroundColor: '#F8F9FA'
            },
          }
        }
      ]
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          lineHeight: '16px',
          border: 'none'
        }
      },
      variants: [
        {
          props: {role: 'columnheader'},
          style: {
            padding: '6px 8px',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '16px',
            color: '#8E93A8',
            backgroundColor: '#F8F9FA',
            '&:hover': {
              backgroundColor: '#F1F2F4'
            }
          }
        },
        {
          props: {role: 'row'},
          style: {
            padding: '10px 8px',
            color: '#171F33'
          }
        }
      ]
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          height: '16px',
          minHeight: 'unset'
        }
      }
    }
  }
});
