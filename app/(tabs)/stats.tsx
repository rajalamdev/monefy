import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ScrollView, useColorScheme } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PieChart } from "react-native-gifted-charts";

export default function StatsScreen() {
  const currentColor = useColorScheme()
  const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
  return (
    <ScrollView className=''>
      <ThemedView className='h-72'>
        <ThemedText>
        <PieChart
            donut
            isThreeD
            showText
            textColor="black"
            radius={170}
            textSize={20}                                                                                                                                                                                                             
            showTextBackground
            textBackgroundRadius={26}
            data={data}
            />
        </ThemedText>
      </ThemedView>
      <ThemedView className='px-6 pb-8 bg-[#141414] rounded-3xl'>
        <ThemedView className={`w-16 rounded-full mx-auto mt-6 mb-8 h-1 ${currentColor === "dark" ? "bg-white" : "bg-black"}`}></ThemedView>
        <ThemedText type="title">Explore</ThemedText>
        <ThemedText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque harum accusamus rerum, at excepturi explicabo perspiciatis aspernatur maiores, illo soluta magnam ducimus vitae asperiores quam assumenda atque, obcaecati provident suscipit veritatis iure pariatur praesentium fuga. Quasi mollitia vero aspernatur doloremque rerum voluptatum repudiandae laboriosam, assumenda et. Sed voluptatem explicabo neque dolorem, odit laborum, aliquam sint illum deleniti quae itaque autem ad eligendi officia provident commodi similique culpa omnis obcaecati ducimus? Magni natus, praesentium, quisquam doloribus minus eligendi neque error labore officia voluptate ullam voluptatibus hic, adipisci veritatis vel. Totam quia placeat at soluta similique unde quod. Architecto dolores perspiciatis dolore voluptatibus odit labore rem nam qui praesentium. Repellendus nobis, veniam perferendis necessitatibus illum adipisci voluptas facilis ullam eaque eius a quae reprehenderit temporibus ipsa sequi aperiam ipsam commodi id! Vel porro odio aliquam. Quae ipsum quisquam esse itaque deserunt non mollitia libero inventore nemo facere molestias modi ullam laborum laudantium eos, quam magnam officiis delectus possimus odio, labore maxime sit? Repudiandae in a nostrum natus dolorem obcaecati autem officia aperiam voluptatum, ex architecto earum provident doloremque eos recusandae esse est minus? Accusantium, a sapiente numquam tempora officia adipisci facere, quasi sit expedita impedit ea quaerat libero enim atque doloribus perspiciatis laudantium ipsa, voluptatum debitis illo nesciunt dolorem quidem! Inventore illum consequatur maiores enim consectetur nam deserunt vel. Consequatur aperiam voluptatem porro fugit iure natus repudiandae in. Nulla neque, illum molestias nisi vero et amet optio esse accusamus error placeat blanditiis molestiae, nobis deleniti quod inventore! Sequi, veritatis temporibus, corporis quisquam esse totam sit possimus voluptatibus recusandae praesentium omnis nobis? Velit perferendis minima minus assumenda blanditiis ratione corrupti dolor tempore, enim excepturi deleniti odio ipsa mollitia voluptates ducimus nesciunt officiis eligendi reprehenderit fuga obcaecati veritatis eius fugiat aspernatur. Dicta similique voluptatibus et est voluptas dolores, vero dolore repellat dolorum quis cupiditate atque doloribus facilis, sed nulla sit. Debitis, culpa eum asperiores illo delectus possimus numquam aut molestiae! Ad totam iste saepe, maiores cum fugit quaerat alias soluta quidem molestiae recusandae animi! Ducimus suscipit, iure quibusdam dolores reiciendis fugit, officia saepe blanditiis distinctio culpa tempore, rerum excepturi. Perspiciatis molestiae eligendi numquam aliquid libero provident vero deserunt. Reprehenderit vero reiciendis labore fuga dignissimos, doloremque illo tempore nobis corporis optio iusto ipsum consequuntur magni. Dolorum, nulla aliquid perferendis beatae soluta totam cum itaque corporis aspernatur iste esse ratione nobis veniam vel. Eius placeat nobis consectetur cupiditate perspiciatis ipsum ullam est cum natus sit velit incidunt aut libero mollitia ipsa necessitatibus aliquam quia ex inventore, tempora pariatur hic! Vero aut expedita id sed suscipit exercitationem molestias qui maiores corporis nihil aperiam, repudiandae nisi at laborum ipsa itaque rem tenetur placeat ratione quas ipsum minus illo. Magnam impedit accusamus repellat harum quam corrupti rerum incidunt ullam voluptatem. Similique in quis suscipit et, corporis quam quod reprehenderit molestias odit, id illo explicabo maiores nulla numquam adipisci minus eveniet eius recusandae, doloribus quibusdam dolore architecto voluptas? Eaque praesentium optio nemo, repellendus ut eligendi aut nulla accusamus sint tempore libero magni ad nesciunt adipisci commodi unde laboriosam odio nihil eum quos aperiam quam facilis, debitis recusandae! Enim, accusantium! Ratione tenetur totam nesciunt quisquam. Ipsum molestiae totam, ratione et dicta aspernatur eaque impedit quos atque quae veniam libero aliquid at! Excepturi reiciendis inventore explicabo perspiciatis laborum tempora. Cupiditate, inventore neque est sequi obcaecati nam laboriosam qui assumenda maxime a corrupti ipsam suscipit excepturi debitis vero eaque quo iure reiciendis vel odit mollitia repellendus incidunt. Facere nemo modi optio facilis officiis ducimus non, dolorem consequatur alias quaerat dolores! Delectus maiores quae sapiente, impedit doloribus corrupti, itaque cumque architecto quia est reprehenderit culpa in consequuntur obcaecati id eum. Excepturi aut dolores eligendi nesciunt quaerat laudantium perspiciatis. Harum non ad laborum quam expedita. Aliquam, ut, vitae vero autem explicabo accusantium quas rerum corporis illo veritatis enim atque distinctio dolor temporibus. Officia exercitationem excepturi itaque deserunt quo hic voluptas quas rem atque error? Debitis distinctio libero veniam incidunt assumenda necessitatibus totam illum suscipit optio alias. Quia repudiandae laborum ab odio iusto corporis inventore exercitationem esse obcaecati. Reprehenderit sint optio quod at nihil ea maiores provident repudiandae ex quam. Nihil aliquid quasi provident aut iste, necessitatibus, totam expedita aspernatur, repellat nobis esse. Temporibus dolorem impedit minima necessitatibus obcaecati assumenda placeat dolor velit aliquam corrupti accusantium, minus laboriosam officiis voluptate est modi debitis quia omnis quos voluptatem laudantium veritatis error et quibusdam. Quo quibusdam, fugiat impedit necessitatibus enim vero accusantium in, magnam, temporibus sit unde dolor rem voluptas ullam deleniti! Error beatae facilis nihil consequuntur voluptatem cum doloremque perferendis aperiam voluptas cumque unde ut nobis sed maxime debitis atque, suscipit quaerat explicabo illo! Iste nulla facere ducimus fugiat aspernatur ea. Sapiente cupiditate voluptatem id earum distinctio aut corporis nisi! Dignissimos quis ratione voluptate blanditiis atque numquam nemo eum at illo, tempora iure nulla, eos incidunt? Nisi excepturi accusamus laboriosam non illum odio tenetur quidem voluptatum atque aliquam culpa sit unde omnis odit eveniet, eum dolore dignissimos amet ratione ea in repellat, explicabo commodi? Iusto, deserunt explicabo ratione vel consequuntur veritatis officia mollitia quasi, velit numquam non amet totam ex vero saepe minus! Excepturi, expedita perferendis inventore ducimus quasi voluptate! Delectus beatae iure ut minus. Adipisci voluptatum pariatur vel nemo! Molestiae adipisci soluta blanditiis porro a dolorem quidem ab doloribus, ea dicta, eveniet quo itaque mollitia facilis praesentium ipsa corrupti ut ad? Similique maiores eos voluptatibus, non deserunt eveniet doloremque, corrupti porro repellendus ex ullam explicabo repudiandae. Saepe nesciunt impedit enim sed natus architecto ipsum voluptas velit et quia, inventore dolorem soluta, error libero distinctio maxime. Veniam nostrum cupiditate ex a error itaque blanditiis fuga atque illo voluptatibus harum, in facilis repellat, facere consequuntur accusamus eveniet minus animi aliquid. Animi accusantium, eos magni sunt ex temporibus ullam tenetur numquam aliquid laboriosam pariatur quisquam similique corporis soluta molestias suscipit laborum minus ipsum praesentium cumque voluptatum minima molestiae delectus? Et nihil libero praesentium incidunt, rem expedita obcaecati adipisci vitae consequuntur, quos quaerat, aut voluptates dolorem perspiciatis reiciendis non consectetur quod officiis nisi magni maiores? Neque a temporibus, dolorem possimus totam quam deleniti libero, accusamus repellendus laboriosam voluptatum accusantium odio?</ThemedText>
      </ThemedView>
    </ScrollView>
  );                                                                    
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
