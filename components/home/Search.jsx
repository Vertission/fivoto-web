import _ from 'lodash';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';

const SearchTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
})(TextField);

const CategoryTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 0,
      },
    },
  },
})(TextField);

const LocationTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 0,
      },
    },
  },
})(TextField);

export default function HomeDownload() {
  const theme = useTheme();
  const classes = useStyles();

  const categoryOptions = categoryList.map(({ category, items }) => {
    return items.map((item) => ({
      category: _.upperCase(category),
      item: _.capitalize(item),
    }));
  });

  const locationOptions = locationList.map(({ district, cities }) => {
    return cities.map((city) => ({
      district: _.upperCase(district),
      city: _.capitalize(city),
    }));
  });

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      {/* SEARCH INPUT  */}
      <SearchTextField label='Search' variant='outlined' />
      {/* CATEGORY INPUT  */}
      <Autocomplete
        options={_.flatten(categoryOptions).sort(
          (a, b) => -b.category.localeCompare(a.category)
        )}
        getOptionLabel={(option) => option.item}
        groupBy={(option) => option.category}
        className={classes.category}
        renderInput={(params) => (
          <CategoryTextField {...params} label='Category' variant='outlined' />
        )}
      />
      {/* LOCATION INPUT  */}
      <Autocomplete
        options={_.flatten(locationOptions).sort(
          (a, b) => -b.district.localeCompare(a.district)
        )}
        getOptionLabel={(option) => option.city}
        groupBy={(option) => option.district}
        className={classes.location}
        renderInput={(params) => (
          <LocationTextField {...params} label='Location' variant='outlined' />
        )}
      />
      {/* SEARCH BUTTON  */}
      <Button color='primary' variant='contained' className={classes.search}>
        <SearchIcon fontSize='large' />
      </Button>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(5, 0, 5, 0),
    padding: theme.spacing(5),
  },

  category: {
    width: 300,
  },
  location: {
    width: 300,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    height: 56,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: 'none',
  },
}));

const locationList = [
  {
    district: 'Ampara',
    cities: ['Akkarepattu', 'Ampara', 'Kalmunai', 'Sainthamaruthu'],
  },
  {
    district: 'Anuradhapura',
    cities: [
      'Anuradhapura',
      'Eppawala',
      'Galenbindunuwewa',
      'Galnewa',
      'Habarana',
      'Kekirawa',
      'Medawachchiya',
      'Mihintale',
      'Nochchiyagama',
      'Talawa',
      'Tambuttegama',
    ],
  },
  {
    district: 'Badulla',
    cities: [
      'Badulla',
      'Bandarawela',
      'Diyathalawa',
      'Ella',
      'Hali Ela',
      'Haputhale',
      'Mahiyanganaya',
      'Passara',
      'Welimada',
    ],
  },
  {
    district: 'Batticaloa',
    cities: ['Batticaloa'],
  },
  {
    district: 'Colombo',
    cities: [
      'Angoda',
      'Athurugiriya',
      'Avissawella',
      'Battaramulla',
      'Boralesgamuwa',
      'Colombo 1',
      'Colombo 2',
      'Colombo 3',
      'Colombo 4',
      'Colombo 5',
      'Colombo 6',
      'Colombo 7',
      'Colombo 8',
      'Colombo 9',
      'Colombo 10',
      'Colombo 11',
      'Colombo 12',
      'Colombo 13',
      'Colombo 14',
      'Colombo 15',
      'Dehiwala',
      'Hanwella',
      'Homagama',
      'Kaduwela',
      'Kesbewa',
      'Kohuwala',
      'Kolonnawa',
      'Kottawa',
      'Kotte',
      'Maharagama',
      'Malabe',
      'Moratuwa',
      'Mount Lavinia',
      'Nawala',
      'Nugegoda',
      'Padukka',
      'Pannipitiya',
      'Piliyandala',
      'Rajagiriya',
      'Ratmalana',
      'Talawatugoda',
      'Wellampitiya',
    ],
  },
  {
    district: 'Galle',
    cities: [
      'Ahangama',
      'Ambalangoda',
      'Baddegama',
      'Balapitiya',
      'Benthota',
      'Elpitiya',
      'Galle',
      'Hikkaduwa',
      'Karapitiya',
    ],
  },
  {
    district: 'Gampaha',
    cities: [
      'Attanagalla',
      'Biyagama',
      'Delgoda',
      'Divulapitiya',
      'Gampaha',
      'Ganemulla',
      'Ja-Ela',
      'Kadawatha',
      'Kandana',
      'Katana',
      'Katunayake',
      'Kelaniya',
      'Kiribathgoda',
      'Mahara',
      'Minuwangoda',
      'Mirigama',
      'Negombo',
      'Nittambuwa',
      'Ragama',
      'Veyangoda',
      'Wattala',
    ],
  },
  {
    district: 'Hambantota',
    cities: [
      'Ambalantota',
      'Beliatta',
      'Hambantota',
      'Tangalla',
      'Tissamaharama',
    ],
  },
  {
    district: 'Jaffna',
    cities: ['Chavakachcheri', 'Jaffna', 'Nallur'],
  },
  {
    district: 'Kalutara',
    cities: [
      'Aluthgama',
      'Bandaragama',
      'Beruwala',
      'Horana',
      'Ingiriya',
      'Kalutara',
      'Matugama',
      'Panadura',
      'Wadduwa',
    ],
  },
  {
    district: 'Kandy',
    cities: [
      'Akurana',
      'Ampitiya',
      'Digana',
      'Galagedara',
      'Gampola',
      'Gelioya',
      'Kadugannawa',
      'Kandy',
      'Katugastota',
      'Kundasale',
      'Madawala Bazaar',
      'Nawalapitiya',
      'Peradeniya',
      'Pilimatalawa',
      'Wattegama',
    ],
  },
  {
    district: 'Kegalle',
    cities: [
      'Dehiowita',
      'Deraniyagala',
      'Galigamuwa',
      'Kegalle',
      'Kithulgala',
      'Mawanella',
      'Rambukkana',
      'Ruwanwella',
      'Warakapola',
      'Yatiyanthota',
    ],
  },
  {
    district: 'Kilinochchi',
    cities: ['Kilinochchi'],
  },
  {
    district: 'Kurunegala',
    cities: [
      'Alawwa',
      'Bingiriya',
      'Galgamuwa',
      'Giriulla',
      'Hettipola',
      'Ibbagamuwa',
      'Kuliyapitiya',
      'Kurunegala',
      'Mawathagama',
      'Narammala',
      'Nikaweratiya',
      'Pannala',
      'Polgahawela',
      'Wariyapola',
    ],
  },
  {
    district: 'Mannar',
    cities: ['Mannar'],
  },
  {
    district: 'Matale',
    cities: [
      'Dambulla',
      'Galewela',
      'Matale',
      'Palapathwela',
      'Rattota',
      'Sigiriya',
      'Ukuwela',
      'Yatawatta',
    ],
  },
  {
    district: 'Moneragala',
    cities: ['Bibile', 'Buttala', 'Kataragama', 'Moneragala', 'Wellawaya'],
  },
  {
    district: 'Matara',
    cities: [
      'Akuressa',
      'Deniyaya',
      'Dikwella',
      'Hakmana',
      'Kamburugamuwa',
      'Kamburupitya',
      'Kekanadurra',
      'Matara',
      'Weligama',
    ],
  },
  {
    district: 'Mullativu',
    cities: ['Mullativu'],
  },
  {
    district: 'Nuwara Eliya',
    cities: ['Ginigathena', 'Hatton', 'Madulla', 'Nuwara Eliya'],
  },
  {
    district: 'Polonnaruwa',
    cities: ['Hingurakgoda', 'Kaduruwela', 'Medirigiriya', 'Polonnaruwa'],
  },
  {
    district: 'Puttalam',
    cities: [
      'Chilaw',
      'Dankotuwa',
      'Marawila',
      'Nattandiya',
      'Puttalam',
      'Wennappuwa',
    ],
  },
  {
    district: 'Ratnapura',
    cities: [
      'Balangoda',
      'Eheliyagoda',
      'Embilipitiya',
      'Kuruwita',
      'Pelmadulla',
      'Ratnapura',
    ],
  },
  {
    district: 'Trincomalee',
    cities: ['Kinniya', 'Trincomalee'],
  },
  {
    district: 'Vavuniya',
    cities: ['Vavuniya'],
  },
];

const categoryList = [
  {
    category: 'device',
    items: [
      'mobile phones',
      'mobile phone accessories',
      'computers & tablets',
      'computer accessories',
      'video games & consoles',
      'other devices',
    ],
    image:
      'https://fivoto-srilanka101812-prod.s3.ap-south-1.amazonaws.com/assets/category/device.png',
  },
  {
    category: 'vehicle',
    items: [
      'cars & vans',
      'motorbikes & scooters',
      'three-wheelers',
      'lorries & heavy vehicles',
      'boats & water transport',
      'auto parts & Accessories',
      'other vehicles',
    ],
    image:
      'https://fivoto-srilanka101812-prod.s3.ap-south-1.amazonaws.com/assets/category/vehicle.png',
  },
  {
    category: 'property',
    items: [
      'houses & apartments',
      'commercial properties',
      'lands',
      'new developments',
      'rooms & annexes',
      'other properties',
    ],
    image:
      'https://fivoto-srilanka101812-prod.s3.ap-south-1.amazonaws.com/assets/category/property.png',
  },
  {
    category: 'appliances & furniture',
    items: [
      'electronic appliances',
      'kitchenwares',
      'furniture',
      'bathroom & sanitary wares',
      'decor & garden',
      'other appliances & furniture',
    ],
    image:
      'https://fivoto-srilanka101812-prod.s3.ap-south-1.amazonaws.com/assets/category/appliancesFurniture.png',
  },
  {
    category: 'sport & hobby',
    items: [
      'gym, fitness equipment',
      ' musical instruments',
      'books, music & movies',
      'sport equipment',
      'antiques & collectibles',
      'toys & indoor games',
      'other sports & hobbies',
    ],
    image:
      'https://fivoto-srilanka101812-prod.s3.ap-south-1.amazonaws.com/assets/category/sportHobby.png',
  },
  {
    category: 'fashion & Beauty',
    items: [
      "men's clothing",
      "women's clothing",
      'kids & babies clothing',
      'fashion accessories',
      'footwears',
      'bags & Luggage',
      'cosmetics & beauty products',
      'other fashion & beauty',
    ],
    image:
      'https://fivoto-srilanka101812-prod.s3.ap-south-1.amazonaws.com/assets/category/fashionBeauty.png',
  },
];
