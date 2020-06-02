package com.sjar.search.lucene;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Maps;
import com.google.protobuf.ServiceException;
import com.sjar.search.config.LuceneConfig;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.*;
import org.apache.lucene.queryparser.classic.MultiFieldQueryParser;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wltea.analyzer.lucene.IKAnalyzer;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author chenxiong
 */
@Service
public class LuceneService {

    private static Logger logger = LoggerFactory.getLogger(LuceneService.class);

    public static Version luceneVersion = Version.LATEST;

    public static final String PRIMARY_KEY = "id";

    @Autowired
    private LuceneConfig luceneConfig;
    /**
     * 创建索引
     * @author chenxiong
     * @since 1.0.0
     * @param indexMaps
     * @throws Exception
     */
    public void createIndex(Map<String,Object> indexMaps) throws Exception {
        //打开存储目录
        Directory dir  = FSDirectory.open(Paths.get("/Users/chenxiong/files/Lucene"));
        //分词器
        Analyzer analyzer = new IKAnalyzer();
        IndexWriterConfig indexWriterConfig = new IndexWriterConfig(analyzer);
        indexWriterConfig.setOpenMode(IndexWriterConfig.OpenMode.CREATE_OR_APPEND);
        IndexWriter writer = new IndexWriter(dir, indexWriterConfig);
        //先删除
        if (indexMaps.get(PRIMARY_KEY) != null) {
            writer.deleteDocuments(new Term(PRIMARY_KEY, indexMaps.get(PRIMARY_KEY).toString()));
        }else {
            throw new Exception("主键的key必须为id,并且值不能为空");
        }
        Document doc = new Document();
        indexMaps.forEach((key, value) -> {
            logger.info("key："+key+"value："+value);
            doc.add(new TextField(key, value.toString(), Field.Store.YES));
        });
        writer.addDocument(doc);
        writer.commit();
        //关闭
        writer.close();
        dir.close();
    }

    /**
     * 删除索引
     * @author chenxiong
     * @since 1.0.0
     * @param indexKey 为创建索引时定义的索引key
     * @param primaryKey 为业务的主键key
     */
    public void delete(String indexKey,String primaryKey) {
        try {
            Directory dir = luceneConfig.directory();
            //分词器
            Analyzer analyzer = new IKAnalyzer();
            IndexWriterConfig indexWriterConfig = new IndexWriterConfig(analyzer);
            IndexWriter writer = new IndexWriter(dir, indexWriterConfig);
            writer.deleteDocuments(new Term(indexKey, primaryKey));
            writer.close();
            dir.close();
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
    }



    /**
     * 查询内容
     */
    public List<Map<String,Object>> indexSearch(String keywords,int size) {

        List<Map<String,Object>> list = new ArrayList<>();
        DirectoryReader reader = null;
        try {
            Directory directory = FSDirectory.open(Paths.get("/Users/chenxiong/files/Lucene"));
            //2、创建IndexReader
            reader = DirectoryReader.open(directory);
            //3、根据IndexReader创建IndexSearcher
            IndexSearcher searcher = new IndexSearcher(reader);
            //4、创建搜索的query
            //创建parse用来确定搜索的内容，第二个参数表示搜索的域
            QueryParser parser = new QueryParser("laws", new StandardAnalyzer());
            Query query = parser.parse(keywords);
            //5、根据Searcher返回TopDocs查询20条记录
            TopDocs tds = searcher.search(query, size*10);

            //6、根据TopDocs获取ScoreDoc
            ScoreDoc[] sds = tds.scoreDocs;
            //7、根据Searcher和ScoreDoc获取搜索到的document对象
            for (ScoreDoc sd : sds) {
                Map<String,Object> retMaps = Maps.newHashMap();
                Document d = searcher.doc(sd.doc);
                //8、根据document对象获取查询的字段值
                retMaps.put("id",d.get("id"));
                retMaps.put("code_name",d.get("code_name"));

                String laws = d.get("laws");
                JSON json = JSON.parseArray(laws);
                retMaps.put("laws",json);
                list.add(retMaps);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //9、关闭reader
            try {
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return list;
    }
    /**
     * 根据关键字查询索引
     * @author chenxiong
     * @since 1.0.0
     * @param keyword
     * @param fieldQuery
     * @return
     * @throws ServiceException
     */
    public List<Document> find(String keyword,String[] fieldQuery) throws ServiceException {
        try {
            Directory dir = luceneConfig.directory();
            IndexReader indexReader = DirectoryReader.open(dir);
            IndexSearcher indexSearcher = new IndexSearcher(indexReader);

            //分词器
            Analyzer analyzer = new IKAnalyzer();
            // 在title与content中查询
            QueryParser parser = new MultiFieldQueryParser(fieldQuery,analyzer);
            Query query = parser.parse(keyword);
            System.out.println("Query分词 = " + query);

            List<Document> documents = this.query(indexSearcher, query);
            indexReader.close();
            dir.close();
            return documents;
        }catch (IndexNotFoundException e1){
            return null;
        }catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new ServiceException("根据关键字，查询出错！", e);
        }
    }


    /**
     * 索引文档查询
     * @author chenxiong
     * @since 1.0.0
     * @param searcher
     * @param query
     * @return
     */
    public List<Document> query(IndexSearcher searcher,Query query) {
        TopDocs topDocs = null;
        ScoreDoc[] scores =null;
        int length = 0;
        try {
            topDocs = searcher.search(query, Integer.MAX_VALUE);
        } catch (IOException e) {
            logger.error(e.getMessage(),e);
        }
        if (topDocs != null) {
            scores = topDocs.scoreDocs;
        }
        if (scores != null) {
            length = scores.length;
        }
        if (length <= 0) {
            return Collections.emptyList();
        }
        List<Document> docList = new ArrayList<Document>();
        try {
            for (int i = 0; i < length; i++) {
                Document doc = searcher.doc(scores[i].doc);
                docList.add(doc);
            }
        } catch (IOException e) {
            logger.error(e.getMessage(),e);
        }
        return docList;
    }
}
